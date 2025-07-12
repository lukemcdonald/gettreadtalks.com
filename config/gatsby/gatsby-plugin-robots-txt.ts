export default {
  resolve: 'gatsby-plugin-robots-txt',
  options: {
    host: 'https://gettreadtalks.com',
    sitemap: 'https://gettreadtalks.com/sitemap.xml',
    policy: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/account/',
          '/login',
          '/register',
          '/password/reset',
          '/404',
          '/admin/',
          '/api/',
          '/_redirects',
          '/sitemap.xml',
          '/rss.xml',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/account/',
          '/login',
          '/register',
          '/password/reset',
          '/404',
          '/admin/',
          '/api/',
        ],
      },
    ],
  },
}
