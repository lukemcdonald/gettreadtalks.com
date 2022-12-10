interface SitemapSerializeProps {
  path: string
  lastmod: string
}

interface SitemapResolvePagesQueryProps {
  fields: {
    slug: string
  }
  data: {
    publishedDate: string
  }
}

interface SitemapResolvePagesProps {
  clips: { nodes: SitemapResolvePagesQueryProps[] }
  pages: { nodes: Pick<SitemapResolvePagesQueryProps, 'fields'>[] }
  series: { nodes: Pick<SitemapResolvePagesQueryProps, 'fields'>[] }
  speakers: { nodes: Pick<SitemapResolvePagesQueryProps, 'fields'>[] }
  talks: { nodes: SitemapResolvePagesQueryProps[] }
  topics: { nodes: Pick<SitemapResolvePagesQueryProps, 'fields'>[] }
}

interface SitemapResolveSiteUrlProps {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
}

export default {
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
    }: SitemapResolveSiteUrlProps) => siteUrl,
    resolvePages: ({
      clips: { nodes: allClips },
      pages: { nodes: allPages },
      series: { nodes: allSeries },
      speakers: { nodes: allSpeakers },
      talks: { nodes: allTalks },
      topics: { nodes: allTopics },
    }: SitemapResolvePagesProps) => {
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
    serialize: ({ path, lastmod }: SitemapSerializeProps) => ({
      url: path,
      lastmod,
    }),
  },
}
