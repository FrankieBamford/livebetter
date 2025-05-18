/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://livebetter.directory",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ["https://livebetter.directory/server-sitemap.xml"],
  },
  exclude: ["/server-sitemap.xml"],
  generateIndexSitemap: false,
};
