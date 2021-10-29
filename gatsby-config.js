require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://gettreadtalks.com',
    title: 'TREAD Talks',
    description:
      'Exercise your inner man with Christ centered sermons to elevate your spiritual heartbeat while working out your physical one.',
    tagline: 'Exercise your inner man.',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-netlify`,
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'TREAD Talks',
        short_name: 'Sermons',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#e62b1a',
        display: 'minimal-ui',
        icon: 'static/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svgs/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
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
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Affiliate Links`,
            tableView: `Published`,
            queryName: `AffiliateLink`,
            mapping: {
              image: `fileNode`,
              description: `text/markdown`,
              link: `text/markdown`,
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Clips`,
            tableView: `Published`,
            queryName: `Clip`,
            tableLinks: [`speakers`, `topics`, `talks`],
            mapping: {
              link: `text/markdown`,
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Pages`,
            tableView: `Published`,
            queryName: `Page`,
            mapping: {
              content: `text/markdown`,
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Scriptures`,
            tableView: `All Scriptures`,
            queryName: `Scripture`,
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Series`,
            tableView: `Published`,
            queryName: `Serie`,
            tableLinks: [`speakers`, `talks`],
            mapping: {
              link: `text/markdown`,
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Speakers`,
            tableView: `Published`,
            queryName: `Speaker`,
            tableLinks: [`clips`, `talks`],
            mapping: {
              avatar: `fileNode`,
              banner: `fileNode`,
              description: `text/markdown`,
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Talks`,
            tableView: `Published`,
            queryName: `Talk`,
            tableLinks: [`series`, `speakers`, `topics`],
            mapping: {
              link: `text/markdown`,
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Topics`,
            tableView: `Published`,
            queryName: `Topic`,
            tableLinks: [`clips`, `talks`],
            separateNodeType: true,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `{
		      site {
		        siteMetadata {
		          siteUrl
		        }
		      }
          clips: allAirtableClip(filter: { data: { title: { ne: null } } }) {
            nodes {
              fields {
                slug
              }
              data {
                publishedDate
              }
            }
          }
          pages: allAirtablePage(filter: { data: { title: { ne: null } } }) {
            nodes {
              fields {
                slug
              }
            }
          }
          series: allAirtableSerie(filter: { data: { title: { ne: null } } }) {
            nodes {
              fields {
                slug
              }
            }
          }
          speakers: allAirtableSpeaker(filter: { data: { title: { ne: null } } }) {
            nodes {
              fields {
                slug
              }
            }
          }
          talks: allAirtableTalk(filter: { data: { title: { ne: null } } }) {
            nodes {
              fields {
                slug
              }
              data {
                publishedDate
              }
            }
          }
          topics: allAirtableTopic(filter: { data: { title: { ne: null } } }) {
            nodes {
              fields {
                slug
              }
            }
          }
		    }`,
        resolveSiteUrl: ({
          site: {
            siteMetadata: { siteUrl },
          },
        }) => siteUrl,
        resolvePages: ({
          clips: { nodes: allClips },
          pages: { nodes: allPages },
          series: { nodes: allSeries },
          speakers: { nodes: allSpeakers },
          talks: { nodes: allTalks },
          topics: { nodes: allTopics },
        }) => {
          const clips = allClips.map((post) => ({
            path: post.fields.slug,
            lastmod: post.data.publishedDate,
          }))

          const pages = allPages.map((post) => ({
            path: post.fields.slug,
          }))

          const series = allSeries.map((post) => ({
            path: post.fields.slug,
          }))

          const speakers = allSpeakers.map((post) => ({
            path: post.fields.slug,
          }))

          const talks = allTalks.map((post) => ({
            path: post.fields.slug,
            lastmod: post.data.publishedDate,
          }))

          const topics = allTopics.map((post) => ({
            path: post.fields.slug,
          }))

          const home = {
            path: '/',
          }

          return [...clips, ...pages, ...series, ...speakers, ...talks, ...topics, home]
        },
        serialize: ({ path, lastmod }) => ({
          url: path,
          lastmod,
        }),
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: 'TREAD Talks',
            description: 'Christ centered sermons to elevate your spiritual heartbeat.',
            output: '/rss.xml',
            site_url: 'https://gettreadtalks.com',
            feed_url: 'https://gettreadtalks.com/rss.xml',
            serialize: ({ query: { site, allAirtableTalk } }) =>
              allAirtableTalk.edges.map(({ node }) => {
                const { link } = node.data
                const { html } = link.childMarkdownRemark

                const url = site.siteMetadata.siteUrl + node.fields.slug
                const htmlSpeaker = `by ${node.data.speakers[0].data.title}`
                const htmlScripture = node.data.scripture ? ` from ${node.data.scripture}` : ''

                return {
                  date: node.data.publishedDate,
                  title: node.data.title,
                  author: node.data.speakers[0].data.title,
                  description: `Listen to "<a href="${url}">${node.data.title}</a>" ${htmlSpeaker}${htmlScripture}`,
                  url,
                  guid: url,
                  custom_elements: [
                    {
                      'content:encoded': `${htmlSpeaker}${htmlScripture}.

                      ${html}
                      `,
                    },
                  ],
                }
              }),
            query: `
            {
              allAirtableTalk(
                limit: 1000
                sort: { fields: data___publishedDate, order: DESC }
                filter: { data: { publishedDate: { ne: null } } }
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    data {
                      title
                      publishedDate
                      scripture
                      speakers {
                        data {
                          title
                        }
                      }
                      link {
                        childMarkdownRemark {
                          html
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
          },
        ],
      },
    },
  ],
}
