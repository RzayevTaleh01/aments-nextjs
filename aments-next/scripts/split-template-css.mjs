import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const inputFile = path.join(root, "src", "assets", "css", "style.min.css");
const globalsCssFile = path.join(root, "src", "app", "globals.css");

const outputs = [
  {
    name: "base",
    file: path.join(root, "src", "styles", "template", "base.scss"),
    buckets: ["base"],
  },
  {
    name: "about",
    file: path.join(root, "src", "styles", "template", "about.scss"),
    buckets: ["about"],
  },
  {
    name: "service",
    file: path.join(root, "src", "styles", "template", "service.scss"),
    buckets: ["service"],
  },
  {
    name: "faq",
    file: path.join(root, "src", "styles", "template", "faq.scss"),
    buckets: ["faq"],
  },
  {
    name: "cart",
    file: path.join(root, "src", "styles", "template", "cart.scss"),
    buckets: ["cart"],
  },
  {
    name: "checkout",
    file: path.join(root, "src", "styles", "template", "checkout.scss"),
    buckets: ["checkout"],
  },
  {
    name: "compare",
    file: path.join(root, "src", "styles", "template", "compare.scss"),
    buckets: ["compare"],
  },
  {
    name: "wishlist",
    file: path.join(root, "src", "styles", "template", "wishlist.scss"),
    buckets: ["wishlist"],
  },
  {
    name: "contact",
    file: path.join(root, "src", "styles", "template", "contact.scss"),
    buckets: ["contact"],
  },
  {
    name: "privacy-policy",
    file: path.join(root, "src", "styles", "template", "privacy-policy.scss"),
    buckets: ["privacy-policy"],
  },
  {
    name: "header",
    file: path.join(root, "src", "styles", "template", "header.scss"),
    buckets: ["header", "offcanvas"],
  },
  {
    name: "footer",
    file: path.join(root, "src", "styles", "template", "footer.scss"),
    buckets: ["footer"],
  },
  {
    name: "breadcrumb",
    file: path.join(root, "src", "styles", "template", "breadcrumb.scss"),
    buckets: ["breadcrumb"],
  },
  {
    name: "modal",
    file: path.join(root, "src", "styles", "template", "modal.scss"),
    buckets: ["modal"],
  },
  {
    name: "home",
    file: path.join(root, "src", "styles", "template", "home.scss"),
    buckets: ["home"],
  },
  {
    name: "home-2",
    file: path.join(root, "src", "styles", "template", "home-2.scss"),
    buckets: ["home"],
  },
  {
    name: "blog-list",
    file: path.join(root, "src", "styles", "template", "blog.scss"),
    buckets: ["blog"],
  },
  {
    name: "blog-post",
    file: path.join(root, "src", "styles", "template", "blog-post.scss"),
    buckets: ["blog"],
  },
  {
    name: "shop",
    file: path.join(root, "src", "styles", "template", "shop.scss"),
    buckets: ["shop"],
  },
  {
    name: "product",
    file: path.join(root, "src", "styles", "template", "product.scss"),
    buckets: ["product"],
  },
  {
    name: "account",
    file: path.join(root, "src", "styles", "template", "account.scss"),
    buckets: ["account"],
  },
  {
    name: "auth",
    file: path.join(root, "src", "styles", "template", "auth.scss"),
    buckets: ["account"],
  },
];

function readFileSafe(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing: ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function isWhitespace(ch) {
  return ch === " " || ch === "\n" || ch === "\r" || ch === "\t" || ch === "\f";
}

function stripComments(css) {
  let out = "";
  for (let i = 0; i < css.length; i++) {
    if (css[i] === "/" && css[i + 1] === "*") {
      i += 2;
      while (i < css.length && !(css[i] === "*" && css[i + 1] === "/")) i++;
      i += 1;
      continue;
    }
    out += css[i];
  }
  return out;
}

function readUntil(css, startIndex, stopChars) {
  let i = startIndex;
  let out = "";
  while (i < css.length && !stopChars.includes(css[i])) {
    out += css[i];
    i++;
  }
  return { out, index: i };
}

function readBlock(css, startIndex) {
  let i = startIndex;
  if (css[i] !== "{") throw new Error(`Expected '{' at ${i}`);
  i++;
  let depth = 1;
  let out = "";
  let inString = false;
  let stringQuote = "";

  while (i < css.length) {
    const ch = css[i];
    if (inString) {
      out += ch;
      if (ch === "\\" && i + 1 < css.length) {
        out += css[i + 1];
        i += 2;
        continue;
      }
      if (ch === stringQuote) {
        inString = false;
        stringQuote = "";
      }
      i++;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      stringQuote = ch;
      out += ch;
      i++;
      continue;
    }

    if (ch === "{") {
      depth++;
      out += ch;
      i++;
      continue;
    }
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
      out += ch;
      i++;
      continue;
    }

    out += ch;
    i++;
  }

  return { out, index: i };
}

function splitSelectors(selectorText) {
  const selectors = [];
  let buf = "";
  let depth = 0;
  let inString = false;
  let stringQuote = "";

  for (let i = 0; i < selectorText.length; i++) {
    const ch = selectorText[i];
    if (inString) {
      buf += ch;
      if (ch === "\\" && i + 1 < selectorText.length) {
        buf += selectorText[i + 1];
        i++;
        continue;
      }
      if (ch === stringQuote) {
        inString = false;
        stringQuote = "";
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      stringQuote = ch;
      buf += ch;
      continue;
    }

    if (ch === "(" || ch === "[" ) depth++;
    if (ch === ")" || ch === "]" ) depth = Math.max(0, depth - 1);

    if (ch === "," && depth === 0) {
      const s = buf.trim();
      if (s) selectors.push(s);
      buf = "";
      continue;
    }
    buf += ch;
  }

  const last = buf.trim();
  if (last) selectors.push(last);
  return selectors;
}

function normalizeSelector(selector) {
  return selector.trim();
}

function guessBucket(selectorsText) {
  const s = selectorsText;
  const has = (token) => s.includes(token);

  if (has(".about-us") || has(".about-feature") || has(".about-promo")) return "about";
  if (has(".service-")) return "service";
  if (has(".faq-") || has(".faq-content")) return "faq";
  if (has(".cart_") || has(".cart-") || has(".cart ")) return "cart";
  if (has(".checkout_") || has(".checkout-") || has(".checkout ")) return "checkout";
  if (has(".compare-table") || has(".compare ")) return "compare";
  if (has(".wishlist")) return "wishlist";
  if (has(".contact")) return "contact";
  if (has(".privacy-policy")) return "privacy-policy";

  if (has(".header") || has(".main-menu") || has(".sticky-header") || has(".header-top") || has(".header-center")) return "header";
  if (has(".mobile-header") || has(".mobile-menu") || has(".offcanvas-mobile-menu") || has(".offcanvas-menu")) return "offcanvas";
  if (has(".offcanvas") || has(".offcanvas-overlay")) return "offcanvas";
  if (has(".footer")) return "footer";
  if (has(".breadcrumb")) return "breadcrumb";
  if (has(".hero-area") || has(".banner-and-hero") || has(".banner-section") || has(".product-catagory") || has(".product-tab") || has(".company-logo") || has(".blog-feed")) return "home";
  if (has(".blog")) return "blog";
  if (has(".product-details") || has(".product-default") || has(".product-single") || has(".zoom") || has(".gallery")) return "product";
  if (has(".shop") || has(".sidebar") || has(".widget") || has(".price-filter") || has("#slider-range")) return "shop";
  if (has(".my-account") || has(".account") || has(".login") || has(".register")) return "account";
  if (has(".modal") || has(".venobox") || has(".popup")) return "modal";

  return "base";
}

function parseStylesheet(css) {
  const buckets = {
    base: [],
    about: [],
    service: [],
    faq: [],
    cart: [],
    checkout: [],
    compare: [],
    wishlist: [],
    contact: [],
    "privacy-policy": [],
    header: [],
    footer: [],
    home: [],
    blog: [],
    shop: [],
    product: [],
    account: [],
    breadcrumb: [],
    offcanvas: [],
    modal: [],
  };

  const safeCss = stripComments(css);

  function parseInto(outBuckets, inputCss) {
    let i = 0;

    function skipWs() {
      while (i < inputCss.length && isWhitespace(inputCss[i])) i++;
    }

    while (i < inputCss.length) {
      skipWs();
      if (i >= inputCss.length) break;
      if (inputCss[i] === "}") break;

      if (inputCss[i] === "@") {
        const { out: atHead, index: headEnd } = readUntil(inputCss, i, ["{", ";"]);
        i = headEnd;
        if (inputCss[i] === ";") {
          const stmt = atHead.trim() + ";";
          if (!stmt.startsWith("@charset")) outBuckets.base.push(stmt);
          i++;
          continue;
        }

        const atName = atHead.trim();
        const { out: blockBody, index: after } = readBlock(inputCss, i);
        i = after;

        const innerBuckets = {
          base: [],
          about: [],
          service: [],
          faq: [],
          cart: [],
          checkout: [],
          compare: [],
          wishlist: [],
          contact: [],
          "privacy-policy": [],
          header: [],
          footer: [],
          home: [],
          blog: [],
          shop: [],
          product: [],
          account: [],
          breadcrumb: [],
          offcanvas: [],
          modal: [],
        };

        parseInto(innerBuckets, blockBody);

        Object.keys(innerBuckets).forEach((bucket) => {
          if (innerBuckets[bucket].length) {
            outBuckets[bucket].push(`${atName}{${innerBuckets[bucket].join("")}}`);
          }
        });

        continue;
      }

      const { out: selectorText, index: selEnd } = readUntil(inputCss, i, ["{"]);
      i = selEnd;
      const { out: decls, index: afterDecls } = readBlock(inputCss, i);
      i = afterDecls;

      const selectorTrimmed = selectorText.trim();
      if (selectorTrimmed === ":root" && decls.includes("--bs-")) {
        continue;
      }

      const selectors = splitSelectors(selectorText);
      const bucket = guessBucket(selectorText);
      const normalizedSelectors = selectors.map(normalizeSelector).join(", ");
      outBuckets[bucket].push(`${normalizedSelectors}{${decls}}`);
    }
  }

  parseInto(buckets, safeCss);
  return buckets;
}

function hexToVarName(hex) {
  return `--aments-color-${hex.toLowerCase().replace(/^#/, "")}`;
}

function replaceHexWithVar(cssText, colorSet) {
  return cssText.replace(/#[0-9a-fA-F]{3,8}\b/g, (match) => {
    colorSet.add(match.toLowerCase());
    return `var(${hexToVarName(match)})`;
  });
}

function readGlobalsImports(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf8");
  return content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith("@import ") && l.endsWith(";"));
}

function writeGlobalsColors(filePath, colorSet) {
  const imports = readGlobalsImports(filePath);
  const colors = Array.from(colorSet)
    .map((c) => c.toLowerCase())
    .filter((c) => /^#[0-9a-f]{3,8}$/.test(c))
    .sort((a, b) => a.localeCompare(b));

  const lines = [];
  imports.forEach((l) => lines.push(l));
  if (imports.length) lines.push("");

  lines.push(":root {");
  colors.forEach((hex) => {
    lines.push(`    ${hexToVarName(hex)}: ${hex};`);
  });
  if (colorSet.has("#ea1c26")) lines.push(`    --aments-color-primary: var(${hexToVarName("#ea1c26")});`);
  if (colorSet.has("#333")) lines.push(`    --aments-color-text: var(${hexToVarName("#333")});`);
  if (colorSet.has("#fff")) lines.push(`    --aments-color-bg: var(${hexToVarName("#fff")});`);
  lines.push("}");
  lines.push("");

  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}

function rewriteAssetUrls(cssText) {
  return cssText.replaceAll("url(../images/", "url(/assets/images/");
}

function writeScss(filePath, cssChunks, colorSet) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const raw = `${cssChunks.join("\n")}\n`;
  const withVars = replaceHexWithVar(raw, colorSet);
  const content = rewriteAssetUrls(withVars);
  fs.writeFileSync(filePath, content, "utf8");
}

function toSassImportPath(fromFile, toFile) {
  const rel = path.relative(path.dirname(fromFile), toFile);
  const normalized = rel.replaceAll("\\", "/");
  return normalized.replace(/\.s[ac]ss$/i, "");
}

function writeProxyScss(filePath, targetScssFile) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const importPath = toSassImportPath(filePath, targetScssFile);
  const content = `@use "${importPath}";\n`;
  fs.writeFileSync(filePath, content, "utf8");
}

function main() {
  try {
    console.log("split-template-css: reading", inputFile);
    const css = readFileSafe(inputFile);
    console.log("split-template-css: size", css.length);
    const buckets = parseStylesheet(css);
    console.log(
      "split-template-css: buckets",
      Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])),
    );

    const usedColors = new Set();
    const generated = [];
    outputs.forEach((out) => {
      const chunks = out.buckets.flatMap((b) => buckets[b] ?? []);
      writeScss(out.file, chunks, usedColors);
      generated.push(`${out.name} -> ${path.relative(root, out.file)}`);
    });

    writeGlobalsColors(globalsCssFile, usedColors);

    const templateRoot = path.join(root, "src", "styles", "template");
    const proxies = [
      {
        file: path.join(root, "src", "components", "sections", "Header", "Header.template.scss"),
        target: path.join(templateRoot, "header.scss"),
      },
      {
        file: path.join(root, "src", "components", "sections", "Footer", "Footer.template.scss"),
        target: path.join(templateRoot, "footer.scss"),
      },
      {
        file: path.join(root, "src", "components", "ui", "Breadcrumb", "Breadcrumb.template.scss"),
        target: path.join(templateRoot, "breadcrumb.scss"),
      },
      {
        file: path.join(root, "src", "components", "helper", "GlobalModals", "GlobalModals.template.scss"),
        target: path.join(templateRoot, "modal.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "HomePage", "HomePage.template.scss"),
        target: path.join(templateRoot, "home.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "HomePage2", "HomePage2.template.scss"),
        target: path.join(templateRoot, "home-2.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "BlogListPage", "BlogListPage.template.scss"),
        target: path.join(templateRoot, "blog.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "BlogPostPage", "BlogPostPage.template.scss"),
        target: path.join(templateRoot, "blog-post.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "ShopCatalogPage", "ShopCatalogPage.template.scss"),
        target: path.join(templateRoot, "shop.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "ProductDetailsPage", "ProductDetailsPage.template.scss"),
        target: path.join(templateRoot, "product.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "MyAccountPage", "MyAccountPage.template.scss"),
        target: path.join(templateRoot, "account.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "LoginPage", "LoginPage.template.scss"),
        target: path.join(templateRoot, "auth.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "AboutUsPage", "AboutUsPage.template.scss"),
        target: path.join(templateRoot, "about.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "ServicePage", "ServicePage.template.scss"),
        target: path.join(templateRoot, "service.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "FAQPage", "FAQPage.template.scss"),
        target: path.join(templateRoot, "faq.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "CartPage", "CartPage.template.scss"),
        target: path.join(templateRoot, "cart.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "CheckoutPage", "CheckoutPage.template.scss"),
        target: path.join(templateRoot, "checkout.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "ComparePage", "ComparePage.template.scss"),
        target: path.join(templateRoot, "compare.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "ContactUsPage", "ContactUsPage.template.scss"),
        target: path.join(templateRoot, "contact.scss"),
      },
      {
        file: path.join(root, "src", "components", "pages", "PrivacyPolicyPage", "PrivacyPolicyPage.template.scss"),
        target: path.join(templateRoot, "privacy-policy.scss"),
      },
    ];

    proxies.forEach(({ file, target }) => {
      writeProxyScss(file, target);
    });

    console.log("Generated template modules:");
    generated.forEach((line) => console.log(`- ${line}`));
    console.log("Generated component template proxies:");
    proxies.forEach(({ file }) => console.log(`- ${path.relative(root, file)}`));
  } catch (err) {
    console.error("split-template-css: failed", err);
    process.exitCode = 1;
  }
}

main();
