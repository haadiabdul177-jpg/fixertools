/*!
 * FixerTools — central tools database
 * ---------------------------------------------------------------------
 * This is the ONE file you edit when you add, rename, hide or re-categorise
 * a tool. The homepage (index.html) and the "Explore More Tools" section on
 * every tool page (tools.js) are generated from it.
 *
 * Field guide
 *   id            unique, lowercase, hyphenated. Normally equals the page filename.
 *   name          the visible tool name.
 *   url           the public path, starting with "/" and WITHOUT ".html".
 *   category      one of the category names listed in FIXERTOOLS.categories.
 *   description   one short sentence shown on cards and in search results.
 *   keywords      extra words people may search for (homepage search uses them).
 *   icon          the glyph/emoji shown on the card.
 *   relatedTools  ids of tools to recommend first.
 *   status        "active" = live. Anything else is ignored everywhere.
 */
window.FIXERTOOLS = {
  categories: [
    { name: "Calculators",     description: "Quick answers for numbers, dates, finance and daily calculations." },
    { name: "Text Tools",      description: "Count, format, clean and transform text in seconds." },
    { name: "Converters",      description: "Convert common units and data formats with ease." },
    { name: "Developer Tools", description: "Helpful utilities for formatting, encoding and generating data." },
    { name: "Image Tools",     description: "Resize and compress images for everyday use." },
    { name: "Other Tools",     description: "More useful tools that do not fit another category." }
  ],

  tools: [
    /* ---------------- Calculators ---------------- */
    {
      id: "age-calculator",
      name: "Age Calculator",
      url: "/age-calculator",
      category: "Calculators",
      description: "Calculate your exact age in years, months and days.",
      keywords: ["age", "birthday", "date of birth", "dob", "zodiac", "birthstone", "years months days"],
      icon: "🎂",
      relatedTools: ["bmi-calculator", "percentage-calculator", "loan-emi-calculator"],
      status: "active"
    },
    {
      id: "percentage-calculator",
      name: "Percentage Calculator",
      url: "/percentage-calculator",
      category: "Calculators",
      description: "Calculate percentages and percentage changes.",
      keywords: ["percent", "percentage", "increase", "decrease", "discount", "ratio", "change"],
      icon: "％",
      relatedTools: ["gst-calculator", "loan-emi-calculator", "bmi-calculator", "age-calculator", "word-counter"],
      status: "active"
    },
    {
      id: "bmi-calculator",
      name: "BMI Calculator",
      url: "/bmi-calculator",
      category: "Calculators",
      description: "Calculate body mass index using height and weight.",
      keywords: ["bmi", "body mass index", "weight", "height", "health", "metric", "imperial"],
      icon: "⚖️",
      relatedTools: ["age-calculator", "percentage-calculator", "loan-emi-calculator"],
      status: "active"
    },
    {
      id: "loan-emi-calculator",
      name: "Loan EMI Calculator",
      url: "/loan-emi-calculator",
      category: "Calculators",
      description: "Estimate monthly loan payments and interest.",
      keywords: ["loan", "emi", "mortgage", "interest", "monthly payment", "repayment", "finance"],
      icon: "🏦",
      relatedTools: ["gst-calculator", "percentage-calculator", "bmi-calculator", "age-calculator", "qr-code-generator"],
      status: "active"
    },
    {
      id: "gst-calculator",
      name: "GST Calculator",
      url: "/gst-calculator",
      category: "Calculators",
      description: "Calculate tax amounts and totals quickly.",
      keywords: ["gst", "vat", "sales tax", "tax", "price", "invoice", "inclusive", "exclusive"],
      icon: "🧾",
      relatedTools: ["percentage-calculator", "loan-emi-calculator", "bmi-calculator", "age-calculator", "qr-code-generator"],
      status: "active"
    },

    /* ---------------- Text Tools ---------------- */
    {
      id: "word-counter",
      name: "Word Counter",
      url: "/word-counter",
      category: "Text Tools",
      description: "Count words, characters and spaces in your text.",
      keywords: ["word", "count", "characters", "sentences", "paragraphs", "reading time", "speaking time"],
      icon: "🔢",
      relatedTools: ["case-converter", "password-generator", "json-formatter", "percentage-calculator", "qr-code-generator"],
      status: "active"
    },
    {
      id: "case-converter",
      name: "Case Converter",
      url: "/case-converter",
      category: "Text Tools",
      description: "Switch text between upper, lower and title case.",
      keywords: ["case", "uppercase", "lowercase", "title case", "sentence case", "camelcase", "snake_case", "kebab"],
      icon: "Aa",
      relatedTools: ["word-counter", "password-generator", "json-formatter", "percentage-calculator", "qr-code-generator"],
      status: "active"
    },

    /* ---------------- Converters ---------------- */
    {
      id: "volume-converter",
      name: "Volume Converter",
      url: "/volume-converter",
      category: "Converters",
      description: "Convert between common volume measurement units.",
      keywords: ["volume", "liters", "litres", "gallons", "cups", "milliliters", "quarts", "fluid ounces", "unit"],
      icon: "🧪",
      relatedTools: ["image-compressor", "percentage-calculator", "loan-emi-calculator", "gst-calculator", "bmi-calculator", "word-counter", "qr-code-generator"],
      status: "active"
    },

    /* ---------------- Developer Tools ---------------- */
    {
      id: "password-generator",
      name: "Password Generator",
      url: "/password-generator",
      category: "Developer Tools",
      description: "Create a strong random password for your accounts.",
      keywords: ["password", "random", "secure", "generator", "security", "passphrase", "strong"],
      icon: "🔐",
      relatedTools: ["qr-code-generator", "case-converter", "word-counter", "json-formatter", "percentage-calculator"],
      status: "active"
    },
    {
      id: "qr-code-generator",
      name: "QR Code Generator",
      url: "/qr-code-generator",
      category: "Developer Tools",
      description: "Create a QR code from text or a website link.",
      keywords: ["qr", "qr code", "barcode", "link", "wifi", "generator", "scan"],
      icon: "▦",
      relatedTools: ["password-generator", "json-formatter", "word-counter", "age-calculator", "image-compressor"],
      status: "active"
    },
    {
      id: "json-formatter",
      name: "JSON Formatter",
      url: "/json-formatter",
      category: "Developer Tools",
      description: "Format and tidy JSON data for easier reading.",
      keywords: ["json", "format", "beautify", "minify", "validate", "validator", "pretty print", "sort keys"],
      icon: "{ }",
      relatedTools: ["qr-code-generator", "case-converter", "password-generator", "word-counter", "image-compressor"],
      status: "active"
    },

    /* ---------------- Image Tools ---------------- */
    {
      id: "image-compressor",
      name: "Image Compressor",
      url: "/image-compressor",
      category: "Image Tools",
      description: "Reduce image file size for easier sharing and upload.",
      keywords: ["image", "photo", "compress", "reduce size", "jpeg", "jpg", "webp", "png", "resize"],
      icon: "🗜️",
      relatedTools: ["youtube-thumbnail-downloader", "pdf-compressor", "volume-converter", "qr-code-generator", "json-formatter", "password-generator", "word-counter", "case-converter", "age-calculator"],
      status: "active"
    },
    {
      id: "youtube-thumbnail-downloader",
      name: "YouTube Thumbnail Downloader",
      url: "/youtube-thumbnail-downloader",
      category: "Image Tools",
      description: "Download YouTube thumbnails in HD quality for free.",
      keywords: ["youtube", "thumbnail", "download", "video", "image", "hd", "maxres", "youtube thumbnail", "yt thumbnail"],
      icon: "🖼️",
      relatedTools: ["image-compressor", "pdf-compressor", "qr-code-generator", "password-generator", "json-formatter", "word-counter"],
      status: "active"
    },

    /* ---------------- Other Tools ---------------- */
    {
      id: "pdf-compressor",
      name: "PDF Compressor",
      url: "/pdf-compressor",
      category: "Other Tools",
      description: "Compress PDF files to reduce size without losing quality.",
      keywords: ["pdf", "compress", "reduce size", "shrink", "pdf compressor", "merge", "optimize"],
      icon: "📄",
      relatedTools: ["image-compressor", "youtube-thumbnail-downloader", "qr-code-generator", "json-formatter"],
      status: "active"
    }
  ]
};