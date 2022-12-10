export default {
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `@raae/gatsby-remark-oembed`,
        options: {
          providers: {
            include: ['Vimeo', 'YouTube'],
          },
        },
      },
      {
        resolve: `gatsby-remark-responsive-iframe`,
      },
    ],
  },
}
