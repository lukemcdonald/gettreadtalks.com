import path from 'path';
import { paginate } from 'gatsby-awesome-pagination';

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions;
	const airtableTables = [
		'Clips',
		'Pages',
		'Series',
		'Speakers',
		'Talks',
		'Topics',
	];

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

async function createClipPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			clips: allAirtable(
				filter: {
					queryName: { eq: "PUBLISHED_CLIPS" }
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	data.clips.edges.forEach((post) => {
		actions.createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/clip.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		});
	});
}

async function createPagePages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			pages: allAirtable(
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	data.pages.edges.forEach((post) => {
		actions.createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/page.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		});
	});
}

async function createSeriesPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			series: allAirtable(
				filter: {
					queryName: { eq: "PUBLISHED_SERIES" }
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	data.series.edges.forEach((post) => {
		actions.createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/series.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		});
	});
}

async function createSpeakerPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			speakers: allAirtable(
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
		}
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	data.speakers.edges.forEach((post) => {
		actions.createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/speaker.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		});
	});
}

async function createTalkPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			talks: allAirtable(
				filter: {
					queryName: { in: ["PUBLISHED_TALKS"] }
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	data.talks.edges.forEach((post) => {
		actions.createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/talk.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		});
	});

	// Paginate content pages.
	paginate({
		createPage: actions.createPage,
		items: data.talks.edges,
		itemsPerPage: 12,
		component: path.resolve('./src/templates/talks.js'),
		pathPrefix: ({ pageNumber }) =>
			pageNumber === 0 ? `/talks` : `/talks/page`,
	});
}

async function createTopicPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			topics: allAirtable(
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
		}
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	data.topics.edges.forEach((post) => {
		actions.createPage({
			path: `${post.node.fields.slug}`,
			component: path.resolve(`./src/templates/topic.js`),
			context: {
				id: post.node.id,
				slug: post.node.fields.slug,
			},
		});
	});
}

export async function createPages(params) {
	await Promise.all([
		createClipPages(params),
		createPagePages(params),
		createSeriesPages(params),
		createSpeakerPages(params),
		createTalkPages(params),
		createTopicPages(params),
	]);
}
