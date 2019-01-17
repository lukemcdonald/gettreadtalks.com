const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

const slugify = string => {
	let str = string;

	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
	const to = 'aaaaaaeeeeiiiioooouuuunc------';

	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-') // collapse dashes
		.replace(/^-+/, '') // trim - from start of text
		.replace(/-+$/, ''); // trim - from end of text

	return str;
};

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
			value: nodePath || slugify(title),
		});
	}
};

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
		// TALKS

		graphql(`
			{
				allAirtable(
					filter: {
						queryName: { eq: "PUBLISHED_TALKS" }
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
			.then(result => {
				const { data, errors } = result;

				if (errors) {
					console.log(errors);
					reject(errors);
				}

				const template = path.resolve(`./src/templates/talk.js`);

				data.allAirtable.edges.forEach(({ node }) => {
					const { id, fields } = node;

					if (fields && fields.slug) {
						createPage({
							path: `${fields.slug}`,
							component: slash(template),
							context: { id },
						});
					}
				});

				resolve();
			})

			// Speakers

			.then(() => {
				graphql(`
					query {
						allAirtable(
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
				`).then(result => {
					const { data, errors } = result;

					if (errors) {
						console.log(errors);
						reject(errors);
					}

					const template = path.resolve(`./src/templates/speaker.js`);

					data.allAirtable.edges.forEach(({ node }) => {
						const { id, fields } = node;

						if (fields && fields.slug) {
							createPage({
								path: `${fields.slug}`,
								component: slash(template),
								context: { id },
							});
						}
					});

					resolve();
				});
			})

			// TOPICS

			.then(() => {
				graphql(`
					{
						allAirtable(
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
				`).then(result => {
					const { data, errors } = result;

					if (errors) {
						console.log(errors);
						reject(errors);
					}

					const template = path.resolve(`./src/templates/topic.js`);

					data.allAirtable.edges.forEach(({ node }) => {
						const { id, fields } = node;

						if (fields && fields.slug) {
							createPage({
								path: `${fields.slug}`,
								component: slash(template),
								context: { id },
							});
						}
					});

					resolve();
				});
			})

			// PAGES

			.then(() => {
				graphql(`
					{
						allAirtable(
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
				`).then(result => {
					const { data, errors } = result;

					if (errors) {
						console.log(errors);
						reject(errors);
					}

					const template = path.resolve(`./src/templates/page.js`);

					data.allAirtable.edges.forEach(({ node }) => {
						const { id, fields } = node;

						if (fields && fields.slug) {
							createPage({
								path: `${fields.slug}`,
								component: slash(template),
								context: { id },
							});
						}
					});

					resolve();
				});
			});
	});
};
