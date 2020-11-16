import path from 'path';
import { paginate } from 'gatsby-awesome-pagination';

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions;
	const airtableTables = [
		'AirtableClip',
		'AirtablePage',
		'AirtableSerie',
		'AirtableSpeaker',
		'AirtableTalk',
		'AirtableTopic',
	];

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
			clips: allAirtableClip(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Clips.`);
		return;
	}

	data.clips.nodes.forEach((post) => {
		actions.createPage({
			path: `${post.fields.slug}`,
			component: path.resolve(`./src/templates/clip.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		});
	});
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Pages.`);
		return;
	}

	data.pages.nodes.forEach((post) => {
		actions.createPage({
			path: `${post.fields.slug}`,
			component: path.resolve(`./src/templates/page.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		});
	});
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Series.`);
		return;
	}

	data.series.nodes.forEach((post) => {
		actions.createPage({
			path: `${post.fields.slug}`,
			component: path.resolve(`./src/templates/series.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		});
	});
}

async function createSpeakerPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			speakers: allAirtableSpeaker(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Speakers.`);
		return;
	}

	data.speakers.nodes.forEach((post) => {
		actions.createPage({
			path: `${post.fields.slug}`,
			component: path.resolve(`./src/templates/speaker.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		});
	});
}

async function createTalkPages({ graphql, actions, reporter }) {
	const { data, errors } = await graphql(`
		query {
			talks: allAirtableTalk(filter: { data: { title: { ne: null } } }) {
				nodes {
					id
					fields {
						slug
					}
				}
			}
		}
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Talks.`);
		return;
	}

	data.talks.nodes.forEach((post) => {
		actions.createPage({
			path: `${post.fields.slug}`,
			component: path.resolve(`./src/templates/talk.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
			},
		});
	});

	// Paginate content pages.
	// paginate({
	// 	createPage: actions.createPage,
	// 	items: data.talks.nodes,
	// 	itemsPerPage: 12,
	// 	component: path.resolve('./src/templates/talks.js'),
	// 	pathPrefix: ({ pageNumber }) =>
	// 		pageNumber === 0 ? `/talks` : `/talks/page`,
	// });
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
	`);

	if (errors) {
		reporter.panicOnBuild(`Error while running GraphQL query for Topics.`);
		return;
	}

	data.topics.nodes.forEach((post) => {
		actions.createPage({
			path: `${post.fields.slug}`,
			component: path.resolve(`./src/pages/talks/index.js`),
			context: {
				id: post.id,
				slug: post.fields.slug,
				topic: post.data.title,
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
