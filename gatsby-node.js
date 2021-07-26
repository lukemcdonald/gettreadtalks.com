exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions
	const airtableTables = [
		'AirtableClip',
		'AirtablePage',
		'AirtableSerie',
		'AirtableSpeaker',
		'AirtableTalk',
		'AirtableTopic',
	]

	/**
	 * Create a slug value on the node fields property.
	 *
	 * 1. Node is an Airtable type
	 * 2. Node type is a whitelisted Airtable
	 * 3. Node data is not empty (empty table row in Airtable)
	 */
	if (
		airtableTables.includes(node.internal.type) &&
		Object.keys(node.data).length
	) {
		const { path, title } = node.data

		createNodeField({
			node,
			name: `slug`,
			value: path || title,
		})
	}
}

async function createClipPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			clips: allAirtableClip(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Clips.`)
		return
	}

	const results = (data.clips || {}).nodes || []

	results.forEach((post) => {
		actions.createPage({
			path: post.fields.slug,
			component: require.resolve(`./src/templates/clip.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		})
	})
}

async function createPagePages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			pages: allAirtablePage(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Pages.`)
		return
	}

	const results = (data.pages || {}).nodes || []

	results.forEach((post) => {
		actions.createPage({
			path: post.fields.slug,
			component: require.resolve(`./src/templates/page.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		})
	})
}

async function createSeriesPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			series: allAirtableSerie(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Series.`)
		return
	}

	const results = (data.series || {}).nodes || []

	results.forEach((post) => {
		actions.createPage({
			path: post.fields.slug,
			component: require.resolve(`./src/templates/series.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		})
	})
}

async function createSpeakerPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			speakers: allAirtableSpeaker(filter: { data: { title: { ne: null } } }) {
				totalCount
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Speakers.`)
		return
	}

	const results = (data.speakers || {}).nodes || []

	results.forEach((post) => {
		actions.createPage({
			path: post.fields.slug,
			component: require.resolve(`./src/templates/speaker.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		})
	})
}

async function createTalkPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			talks: allAirtableTalk(filter: { data: { title: { ne: null } } }) {
				totalCount
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Talks.`)
		return
	}

	const results = (data.talks || {}).nodes || []
	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
	const pageCount = Math.ceil(data.talks.totalCount / pageSize)

	Array.from({ length: pageCount }).forEach((_, i) => {
		actions.createPage({
			path: `/talks/${i + 1}`,
			component: require.resolve(`./src/pages/talks/index.js`),
			context: {
				skip: i * pageSize,
				currentPage: i + 1,
				pageSize,
			},
		})
	})

	results.forEach((post) => {
		actions.createPage({
			path: post.fields.slug,
			component: require.resolve(`./src/templates/talk.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		})
	})
}

async function createTopicPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			topics: allAirtableTopic(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
					data {
						title
					}
				}
			}
		}
	`)

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Topics.`)
		return
	}

	const results = (data.topics || {}).nodes || []

	results.forEach((post) => {
		actions.createPage({
			path: post.fields.slug,
			component: require.resolve(`./src/pages/talks/index.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
				topic: post.data.title,
			},
		})
	})
}

export async function createPages(params) {
	await Promise.all([
		createClipPages(params),
		createPagePages(params),
		createSeriesPages(params),
		createSpeakerPages(params),
		createTalkPages(params),
		createTopicPages(params),
	])
}
