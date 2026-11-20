const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const hljs = require("highlight.js");

const HTML_STRUCTURAL_TAGS = new Set([
    "html", "head", "body", "meta", "link", "title", "base", "script", "style", "noscript",
    "header", "nav", "main", "footer", "section", "article", "aside", "div",
    "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "dl", "dt", "dd",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
    "figure", "figcaption", "blockquote", "details", "summary", "form", "fieldset", "legend", "hr", "br"
]);

/**
 * Minify CSS safely: preserves quoted strings, calc() operator spacing,
 * descendant pseudo-class spacing (e.g. `.parent :hover`), and keyframes/gradients.
 */
function minifyCss(css) {
    if (!css) return "";
    let out = "";
    const len = css.length;
    let i = 0;
    let pendingSpace = false;

    const flushSpaceIfNeeded = (nextChar) => {
        if (!pendingSpace) return;
        pendingSpace = false;
        if (!out) return;
        const prevChar = out[out.length - 1];
        if (prevChar === "{" || prevChar === "}" || prevChar === ";" || prevChar === "," || prevChar === "(" || prevChar === ":") {
            return;
        }
        if (nextChar === "{" || nextChar === "}" || nextChar === ";" || nextChar === "," || nextChar === ")") {
            return;
        }
        out += " ";
    };

    while (i < len) {
        const ch = css[i];

        if (ch === "/" && css[i + 1] === "*") {
            const end = css.indexOf("*/", i + 2);
            i = end === -1 ? len : end + 2;
            pendingSpace = true;
            continue;
        }

        if (ch === '"' || ch === "'") {
            flushSpaceIfNeeded(ch);
            const quote = ch;
            let str = ch;
            i++;
            while (i < len) {
                const c = css[i];
                str += c;
                if (c === "\\" && i + 1 < len) {
                    str += css[i + 1];
                    i += 2;
                    continue;
                }
                i++;
                if (c === quote) break;
            }
            out += str;
            continue;
        }

        if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n" || ch === "\f") {
            pendingSpace = true;
            i++;
            continue;
        }

        if (ch === ";") {
            pendingSpace = false;
            if (out[out.length - 1] !== ";" && out[out.length - 1] !== "{") {
                out += ";";
            }
            i++;
            continue;
        }

        if (ch === "}") {
            pendingSpace = false;
            if (out[out.length - 1] === ";") {
                out = out.slice(0, -1);
            }
            out += "}";
            i++;
            continue;
        }

        flushSpaceIfNeeded(ch);
        out += ch;
        i++;
    }
    return out.trim();
}

/**
 * Minify HTML safely: preserves <pre>, <code>, <textarea>, and inline JS <script>
 * verbatim, minifies <style> CSS and JSON-LD/speculationrules <script> blocks,
 * and keeps inline whitespace between adjacent inline elements intact.
 */
function minifyHtml(html) {
    if (!html) return "";
    const preserved = [];
    const placeholder = (index) => `\u0000PRESERVED_${index}\u0000`;

    const protectedRe = /<(pre|code|textarea|script|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi;
    let masked = html.replace(protectedRe, (full, tag, attrs, inner) => {
        const lowerTag = tag.toLowerCase();
        let replacement = full;
        if (lowerTag === "style") {
            replacement = `<style${attrs}>${minifyCss(inner)}</style>`;
        } else if (lowerTag === "script" && /type\s*=\s*["'](?:application\/ld\+json|speculationrules)["']/i.test(attrs)) {
            try {
                replacement = `<script${attrs}>${JSON.stringify(JSON.parse(inner))}</script>`;
            } catch (_) {
                replacement = full;
            }
        }
        const idx = preserved.length;
        preserved.push(replacement);
        return placeholder(idx);
    });

    masked = masked.replace(/<!--[\s\S]*?-->/g, "");
    masked = masked.replace(/[ \t\r\n]+/g, " ");

    masked = masked.replace(/(<\/?([a-zA-Z0-9-]+)[^>]*>|<!doctype[^>]*>)\s+(<\/?([a-zA-Z0-9-]+)[^>]*>|\u0000PRESERVED_\d+\u0000)/gi, (match, left, leftTag, right, rightTag) => {
        const l = (leftTag || "").toLowerCase();
        const r = (rightTag || "").toLowerCase();
        if (left.toLowerCase().startsWith("<!doctype") || HTML_STRUCTURAL_TAGS.has(l) || HTML_STRUCTURAL_TAGS.has(r)) {
            return left + right;
        }
        return match;
    });

    masked = masked.replace(/(\u0000PRESERVED_\d+\u0000)\s+(<\/([a-zA-Z0-9-]+)>)/gi, (match, left, right, rightTag) => {
        if (HTML_STRUCTURAL_TAGS.has(rightTag.toLowerCase())) {
            return left + right;
        }
        return match;
    });

    masked = masked.replace(/\u0000PRESERVED_(\d+)\u0000/g, (_, idx) => preserved[Number(idx)]);
    return masked.trim();
}

module.exports = function (eleventyConfig) {
    /* --- بهینه‌سازی واچ و جلوگیری از قفل شدن فایل‌ها در ویندوز --- */
    eleventyConfig.setWatchThrottleWaitTime(400);
    eleventyConfig.watchIgnores.add("src/fonts/**");
    eleventyConfig.watchIgnores.add("src/images/**");
    eleventyConfig.watchIgnores.add("src/downloads/**");
    eleventyConfig.watchIgnores.add("src/books/**/assets/**");

    /* تنظیمات سرور لوکال جهت جلوگیری از تداخل بازنویسی فایل‌ها در ویندوز و رفع خطای Case Sensitivity */
    eleventyConfig.setServerOptions({
        watch: ["_site/styles/*.css"],
        showAllHosts: true,
        middleware: [
            function (req, res, next) {
                // هدایت روت اصلی به مسیر /Gitab/
                if (req.url === "/" || req.url === "") {
                    res.writeHead(302, { Location: "/Gitab/" });
                    return res.end();
                }
                // اگر درخواست با حروف کوچک /gitab/ وارد شد، به مسیر اصلی /Gitab/ هدایت شود
                if (req.url && /^\/gitab(\/.*)?$/i.test(req.url) && !req.url.startsWith("/Gitab")) {
                    const correctedUrl = req.url.replace(/^\/gitab/i, "/Gitab");
                    res.writeHead(301, { Location: correctedUrl });
                    return res.end();
                }
                next();
            }
        ]
    });

    /* فیلتر استاتیک تولید لینک فصل بعدی در تمام کتاب‌ها در زمان بیلد (Build-Time) */
    eleventyConfig.addFilter("getNextChapterInfo", function (currentUrl, bookId, bookChapters) {
        if (!bookId || !bookChapters || !bookChapters[bookId]) return null;
        const list = bookChapters[bookId];
        const normalizedCurrent = (currentUrl || "").replace(/\/+$/, "").toLowerCase();

        let currentIndex = -1;
        for (let i = 0; i < list.length; i++) {
            const itemUrl = (list[i].url || "").replace(/\/+$/, "").toLowerCase();
            if (
                normalizedCurrent === itemUrl ||
                normalizedCurrent.endsWith(itemUrl) ||
                itemUrl.endsWith(normalizedCurrent) ||
                (normalizedCurrent.includes("/book/") &&
                    itemUrl.includes("/book/") &&
                    normalizedCurrent.split("/book/")[1] === itemUrl.split("/book/")[1])
            ) {
                currentIndex = i;
                break;
            }
        }

        if (currentIndex >= 0 && currentIndex < list.length - 1) {
            const next = list[currentIndex + 1];
            return {
                isLast: false,
                url: next.url,
                title: next.title || "فصل بعدی"
            };
        } else if (currentIndex >= 0 && currentIndex === list.length - 1) {
            return {
                isLast: true,
                url: null,
                title: "پایان کتاب — بازگشت به فهرست سرفصل‌ها"
            };
        }
        return null;
    });

    /* فیلتر امن تبدیل داده به JSON برای Schema.org JSON-LD */
    eleventyConfig.addFilter("jsonify", function (value) {
        return JSON.stringify(value);
    });

    /* --- Passthrough: فایل‌هایی که باید کپی بشن --- */
    eleventyConfig.addPassthroughCopy({
        "node_modules/highlight.js/styles/github-dark.min.css": "styles/vendor/github-dark.min.css"
    });
    eleventyConfig.addWatchTarget("src/styles/");
    eleventyConfig.on("eleventy.after", ({ dir }) => {
        const stylesSrc = path.join(__dirname, "src", "styles");
        const stylesOut = path.join(dir.output, "styles");
        if (!fs.existsSync(stylesSrc)) return;
        fs.mkdirSync(stylesOut, { recursive: true });
        for (const entry of fs.readdirSync(stylesSrc, { withFileTypes: true })) {
            if (!entry.isFile()) continue;
            const srcFile = path.join(stylesSrc, entry.name);
            const outFile = path.join(stylesOut, entry.name);
            if (entry.name.endsWith(".css")) {
                const rawCss = fs.readFileSync(srcFile, "utf8");
                fs.writeFileSync(outFile, minifyCss(rawCss), "utf8");
            } else {
                fs.copyFileSync(srcFile, outFile);
            }
        }
    });
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/downloads");
    eleventyConfig.addPassthroughCopy("src/books/book1/assets");
    eleventyConfig.addPassthroughCopy("src/books/book2/assets");
    eleventyConfig.addPassthroughCopy("src/books/book3/assets");
    eleventyConfig.addPassthroughCopy("src/books/book4/assets");
    eleventyConfig.addPassthroughCopy("src/books/book5/assets");
    eleventyConfig.addPassthroughCopy("src/books/book6/assets");
    eleventyConfig.addPassthroughCopy("src/books/book7/assets");
    eleventyConfig.addPassthroughCopy("src/books/book8/assets");
    eleventyConfig.addPassthroughCopy("src/books/book9/assets");
    eleventyConfig.addPassthroughCopy("src/books/book10/assets");
    eleventyConfig.addPassthroughCopy("src/books/book11/assets");
    eleventyConfig.addPassthroughCopy("src/books/book12/assets");
    eleventyConfig.addPassthroughCopy("src/books/book13/assets");
    eleventyConfig.addPassthroughCopy("src/books/book14/assets");
    eleventyConfig.addPassthroughCopy("src/books/book15/assets");
    eleventyConfig.addPassthroughCopy("src/books/book16/assets");
    eleventyConfig.addPassthroughCopy("src/courses/generative-ai-for-beginners/assets");
    eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
    eleventyConfig.addPassthroughCopy({ "src/sw.js": "sw.js" });
    eleventyConfig.addPassthroughCopy("src/icone");
    eleventyConfig.addPassthroughCopy({ "src/Giter": "Giter" });

    /* --- Markdown با Highlight.js و lazy-loading تصاویر --- */
    const markdownLib = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return (
                        '<pre class="hljs"><code>' +
                        hljs.highlight(str, {
                            language: lang,
                            ignoreIllegals: true,
                        }).value +
                        "</code></pre>"
                    );
                } catch (__) {}
            }
            return (
                '<pre class="hljs"><code>' +
                markdownIt().utils.escapeHtml(str) +
                "</code></pre>"
            );
        },
    });
    const defaultImageRenderer =
        markdownLib.renderer.rules.image ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };
    markdownLib.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        if (token.attrIndex("loading") < 0) {
            token.attrPush(["loading", "lazy"]);
        }
        if (token.attrIndex("decoding") < 0) {
            token.attrPush(["decoding", "async"]);
        }
        return defaultImageRenderer(tokens, idx, options, env, self);
    };
    eleventyConfig.setLibrary("md", markdownLib);

    /* --- مینیفای امن خروجی HTML --- */
    eleventyConfig.addTransform("htmlmin", function (content) {
        if (this.page && this.page.outputPath && this.page.outputPath.endsWith(".html")) {
            return minifyHtml(content);
        }
        return content;
    });

    /* --- مسیرهای پروژه --- */
    return {
        dir: {
            input: "src", // مسیر اصلی پروژه
            output: "_site", // خروجی سایت
            includes: "_includes", // مسیر قالب‌ها (حتماً با آندرلاین)
            layouts: "_includes",
        },
        pathPrefix: "/Gitab/", // 👈 بسیار مهم
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md"],
    };
};
