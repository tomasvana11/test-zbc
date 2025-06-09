// next-sitemap.config.js

const siteUrl = 'https://zabohatsicesko.cz';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Dynamické cesty z WP API
  additionalPaths: async (config) => {
    const types = ['blog', 'recenze', 'podcast', 'tym', 'pracovni-pozice'];
    const urls = [];

    for (const type of types) {
      const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/${type}?per_page=100`);
      const items = await res.json();

      items.forEach((item) => {
        let slugPath = '';

        switch (type) {
          case 'blog':
            slugPath = `/clanky/${item.slug}`;
            break;
          case 'recenze':
            slugPath = `/recenze/${item.slug}`;
            break;
          case 'podcast':
            slugPath = `/podcast/${item.slug}`;
            break;
          case 'tym':
            slugPath = `/tym/${item.slug}`;
            break;
          case 'pracovni-pozice':
            slugPath = `/kariera/${item.slug}`;
            break;
        }

        urls.push({
          loc: slugPath,
          lastmod: item.modified || new Date().toISOString(),
        });
      });
    }

    return urls;
  },
};
