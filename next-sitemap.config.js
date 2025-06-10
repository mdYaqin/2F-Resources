const siteUrl = "https://2fresources.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  outDir: "./public",
  exclude: ["/admin/*"],
  autoLastmod: true,

  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
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
