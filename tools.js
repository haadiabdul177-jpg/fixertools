/*!
 * FixerTools — "Explore More Tools" generator
 * ---------------------------------------------------------------------
 * Runs on every individual tool page. It reads the central database in
 * /tools-data.js (window.FIXERTOOLS) and fills <div id="related-tools"></div>
 * with links to other tools. Nothing here needs editing when you add a tool:
 * add the tool to tools-data.js and every tool page picks it up.
 *
 * Rules
 *  - relatedTools ids of the current tool come first (in the order listed).
 *  - Then other tools from the same category.
 *  - Then tools from other categories, so the section is never nearly empty.
 *  - The current page, duplicates, inactive tools and incomplete entries
 *    are never shown.
 *  - Optional: <div id="related-tools" data-limit="8"></div> changes how many
 *    links are shown (default: all active tools, allowed 1-100).
 *
 * It also adds BreadcrumbList structured data when the page does not already
 * have one. If the page has a visible breadcrumb trail (.crumbs), the
 * structured data copies that trail so the two always agree.
 *
 * Plain JavaScript, no libraries. Content is built with createElement and
 * textContent only (no innerHTML). If anything is missing the script does
 * nothing and the page works exactly as before.
 */
(function () {
  "use strict";

  var DEFAULT_LIMIT = 100; /* show every other active tool */
  var MAX_LIMIT = 100;

  /* ---------- helpers ---------- */

  function normPath(p) {
    p = String(p || "/").split("#")[0].split("?")[0];
    p = p.replace(/\/index\.html?$/i, "/");
    p = p.replace(/\.html?$/i, "");
    if (p.length > 1) p = p.replace(/\/+$/, "");
    return p.toLowerCase() || "/";
  }

  function isText(v) {
    return typeof v === "string" && v.trim() !== "";
  }

  /* Only complete, live tools with a site-relative URL are usable. */
  function usableTools(data) {
    if (!data || !Array.isArray(data.tools)) return [];
    var ids = {};
    var out = [];
    data.tools.forEach(function (t) {
      if (!t || t.status !== "active") return;
      if (!isText(t.id) || !isText(t.name) || !isText(t.url) || t.url.charAt(0) !== "/") return;
      if (ids[t.id]) return; /* duplicate id: keep the first */
      ids[t.id] = true;
      out.push(t);
    });
    return out;
  }

  function canonicalUrl() {
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) return null;
    try {
      return new URL(link.getAttribute("href"), location.href);
    } catch (e) {
      return null;
    }
  }

  /* Which database entry is this page? URL first, then canonical, then body[data-page]. */
  function findCurrent(tools) {
    var here = normPath(location.pathname);
    var i;
    for (i = 0; i < tools.length; i++) {
      if (normPath(tools[i].url) === here) return tools[i];
    }
    var canon = canonicalUrl();
    if (canon) {
      var cp = normPath(canon.pathname);
      for (i = 0; i < tools.length; i++) {
        if (normPath(tools[i].url) === cp) return tools[i];
      }
    }
    var page = document.body && document.body.getAttribute("data-page");
    if (page) {
      for (i = 0; i < tools.length; i++) {
        if (tools[i].id === page) return tools[i];
      }
    }
    return null;
  }

  /* ---------- choosing the links ---------- */

  function pickRelated(current, tools, limit) {
    var byId = {};
    tools.forEach(function (t) { byId[t.id] = t; });

    var hereUrl = normPath(location.pathname);
    var seenIds = {};
    var seenUrls = {};
    var out = [];

    if (current) {
      seenIds[current.id] = true;
      seenUrls[normPath(current.url)] = true;
    }
    seenUrls[hereUrl] = true;

    function add(t) {
      if (!t || out.length >= limit) return;
      var u = normPath(t.url);
      if (seenIds[t.id] || seenUrls[u]) return;
      seenIds[t.id] = true;
      seenUrls[u] = true;
      out.push(t);
    }

    if (current && Array.isArray(current.relatedTools)) {
      current.relatedTools.forEach(function (id) { add(byId[id]); });
    }
    if (current) {
      tools.forEach(function (t) { if (t.category === current.category) add(t); });
    }
    tools.forEach(add);
    return out;
  }

  /* ---------- rendering ---------- */

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  function render(box, list) {
    var nav = el("nav", "ft-related");
    nav.setAttribute("aria-labelledby", "ft-related-title");

    var h = el("h2", "ft-related__title", "Explore More Tools");
    h.id = "ft-related-title";
    nav.appendChild(h);

    var ul = el("ul", "ft-related__list");
    list.forEach(function (t) {
      var li = el("li", "ft-related__item");
      var a = el("a", "ft-related__link");
      a.href = t.url;

      if (isText(t.icon)) {
        var ic = el("span", "ft-related__icon", t.icon);
        ic.setAttribute("aria-hidden", "true");
        a.appendChild(ic);
      }
      var txt = el("span", "ft-related__text");
      txt.appendChild(el("span", "ft-related__name", t.name));
      if (isText(t.description)) txt.appendChild(el("span", "ft-related__desc", t.description));
      a.appendChild(txt);

      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    var all = el("p", "ft-related__all");
    var allLink = el("a", "ft-related__alllink", "Browse all tools");
    allLink.href = "/#tools";
    all.appendChild(allLink);
    nav.appendChild(all);

    box.textContent = "";
    box.appendChild(nav);
    box.setAttribute("data-ft-rendered", "true");
  }

  /* ---------- BreadcrumbList structured data ---------- */

  function hasBreadcrumbData() {
    var s = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < s.length; i++) {
      if (s[i].id === "ft-breadcrumb-ld" || /"BreadcrumbList"/.test(s[i].textContent || "")) return true;
    }
    return false;
  }

  function addBreadcrumbData(current) {
    if (!current || hasBreadcrumbData()) return;

    var canon = canonicalUrl();
    var origin = canon ? canon.origin : location.origin;
    var pageUrl = canon ? canon.href : origin + current.url;
    var items = [];

    var trail = document.querySelector('.crumbs, nav[aria-label="Breadcrumb"]');
    if (trail) {
      var kids = trail.children;
      for (var i = 0; i < kids.length; i++) {
        var k = kids[i];
        var label = (k.textContent || "").trim();
        if (!label) continue;
        if (k.tagName === "A" && k.getAttribute("href")) {
          try {
            items.push({ name: label, item: new URL(k.getAttribute("href"), origin + "/").href });
          } catch (e) { /* skip bad href */ }
        } else if (k.tagName === "B" || k.tagName === "SPAN" || k.tagName === "STRONG") {
          items.push({ name: label, item: pageUrl });
        }
      }
    }

    /* No usable visible trail: use the database hierarchy. */
    if (items.length < 2 || items[items.length - 1].item !== pageUrl) {
      items = [
        { name: "Home", item: origin + "/" },
        { name: current.category, item: origin + "/#tools" },
        { name: current.name, item: pageUrl }
      ];
    }

    var data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map(function (it, idx) {
        return { "@type": "ListItem", "position": idx + 1, "name": it.name, "item": it.item };
      })
    };

    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "ft-breadcrumb-ld";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- start ---------- */

  function init() {
    var tools = usableTools(window.FIXERTOOLS);

    /* ---------- Related-links rendering (conditional) ---------- */
    var box = document.getElementById("related-tools");
    if (box && box.getAttribute("data-ft-rendered") !== "true" && tools.length) {
      var current = findCurrent(tools);

      /* If static related links already exist in the HTML, skip JS injection
         of related links only. Breadcrumb JSON-LD is still added below. */
      if (!box.querySelector("a[href]")) {
        var limit = parseInt(box.getAttribute("data-limit"), 10);
        if (!(limit >= 1)) limit = DEFAULT_LIMIT;
        if (limit > MAX_LIMIT) limit = MAX_LIMIT;

        var list = pickRelated(current, tools, limit);
        if (list.length) {
          render(box, list);
        }
      }
    }

    /* ---------- BreadcrumbList structured data (runs independently) ---------- */
    if (tools.length) {
      var current = findCurrent(tools);
      addBreadcrumbData(current);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
