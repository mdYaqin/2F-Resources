const siteUrl = "https://2fresources.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  outDir: "./public",
  exclude: ["/admin/*"],

  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`, // add any extra sitemaps here
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    host: siteUrl,
  },
};
