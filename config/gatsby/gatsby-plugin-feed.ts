interface FeedSerializeNode {
  fields: {
    slug: string
  }
  data: {
    title: string
    publishedDate: string
    scripture: string
    speakers: {
      data: {
        title: string
      }
    }[]
    link: {
      childMarkdownRemark: {
        html: string
      }
    }
  }
}

interface FeedSerializeProps {
  query: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
        site_url: string
      }
    }
    allAirtableTalk: {
      edges: {
        node: FeedSerializeNode
      }[]
    }
  }
}

export default {
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
        serialize: ({ query: { site, allAirtableTalk } }: FeedSerializeProps) =>
          allAirtableTalk.edges.map(({ node }: { node: FeedSerializeNode }) => {
            const { link } = node.data
            const { html } = link.childMarkdownRemark

            const url = site.siteMetadata.siteUrl + node.fields.slug
            const htmlSpeaker = `by ${node.data.speakers[0].data.title}`
            const htmlScripture = node.data.scripture ? ` from ${node.data.scripture}` : ''

            return {
              ...node.data,
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
}
