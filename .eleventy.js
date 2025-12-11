const markdownIt = require("markdown-it");
const hljs = require("highlight.js");

module.exports = function (eleventyConfig) {
    /* --- Passthrough: فایل‌هایی که باید کپی بشن --- */
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/contribute.html");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/books/book1/assets");
    eleventyConfig.addPassthroughCopy("src/books/book2/assets");
    eleventyConfig.addPassthroughCopy("src/books/book3/assets");
    eleventyConfig.addPassthroughCopy("src/books/book4/assets");
    eleventyConfig.addPassthroughCopy("src/books/book5/assets");
    eleventyConfig.addPassthroughCopy("src/books/book6/assets");
    eleventyConfig.addPassthroughCopy("src/books/book7/assets");
    eleventyConfig.addPassthroughCopy("src/books/book8/assets");
    eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
    eleventyConfig.addPassthroughCopy("src/icone");
    eleventyConfig.addPassthroughCopy(".nojekyll");
    eleventyConfig.addPassthroughCopy({ "src/Giter": "Giter" });

    /* --- Markdown با Highlight.js --- */
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
    eleventyConfig.setLibrary("md", markdownLib);

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
