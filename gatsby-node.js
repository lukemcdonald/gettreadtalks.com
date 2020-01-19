const path = require(`path`);
const { paginate } = require(`gatsby-awesome-pagination`);

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions;
	const airtableTables = ['Pages', 'Speakers', 'Talks', 'Topics'];

	/**
	 * Create a slug value on the node fields property.
	 *
	 * 1. Node is an Airtable type
	 * 2. Node type is a whitelisted Airtable
	 * 3. Node data is not empty (empty table row in Airtable)
	 */
	if (
		node.internal.type === `Airtable` &&
		airtableTables.includes(node.table) &&
		Object.keys(node.data).length
	) {
		const { path: nodePath, title } = node.data;

		createNodeField({
			node,
			name: `slug`,
			value: nodePath || title,
		});
	}
};

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;

	// Query data.
	const result = await graphql(`
		{
			talksQuery: allAirtable(
				filter: {
					queryName: { in: ["APPROVED_TALKS","PUBLISHED_TALKS"] }
					data: { title: { ne: null } }
				}
			) {
				edges {
					node {
						id
						fields {
							slug
						}
					}
				}
			}
			speakersQuery: allAirtable(
				filter: {
					queryName: { eq: "PUBLISHED_SPEAKERS" }
					data: { title: { ne: null } }
				}
			) {
				edges {
					node {
						id
						fields {
							slug
						}
					}
				}
			}
			topicsQuery: allAirtable(
				filter: {
					queryName: { eq: "PUBLISHED_TOPICS" }
					data: { title: { ne: null } }
				}
			) {
				edges {
					node {
						id
						fields {
							slug
						}
					}
				}
			}
			pagesQuery: allAirtable(
				filter: {
					queryName: { eq: "PUBLISHED_PAGES" }
					data: { title: { ne: null } }
				}
			) {
				edges {
					node {
						id
						fields {
							slug
						}
					}
				}
			}
		}
	`)

	// Report errors.
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`)
		return
	}

	// Define content types.
	const Talks    = result.data.talksQuery.edges
	const Speakers = result.data.speakersQuery.edges
	const Topics   = result.data.topicsQuery.edges
	const Pages    = result.data.pagesQuery.edges

	// Create pages.
	Talks.forEach(post => {
		createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/talk.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		})
	})

	paginate({
		createPage,
		items: Talks,
		itemsPerPage: 12,
		component: path.resolve('./src/templates/talks.js'),
		pathPrefix: ({ pageNumber }) =>	pageNumber === 0 ? `/talks` : `/talks/page`,
	});

	Speakers.forEach(post => {
		createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/speaker.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		})
	})

	Topics.forEach(post => {
		createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/topic.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		})
	})

	Pages.forEach(post => {
		createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/page.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		})
	})

};
