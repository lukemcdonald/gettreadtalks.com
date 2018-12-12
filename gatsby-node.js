const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

const toSlug = (string) => {
	let str = string;

  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to   = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	const airtableTables = ['Speakers', 'Talks', 'Topics'];

  if (node.internal.type === `Airtable` && airtableTables.includes(node.table)) {
		const { name, title } = node.data;

		createNodeField({
			node,
			name: `slug`,
			value: toSlug(name || title)
		});
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
		const resolvePage = (result, { queryName, templatePath, urlPath = '' }) => {
			const { data, errors } = result;

			if (errors) {
				console.log(errors);
				reject(errors);
			}

			const template = path.resolve(templatePath);

			data[queryName].edges.forEach(({node}) => {
				const {name, title} = node.data;

				createPage({
					path: `${urlPath}/${node.fields.slug}`,
					component: slash(template),
					context: {
						title: name || title,
					}
				});
			});

			resolve();
		}

		// TALKS

		graphql(`
			{
				allAirtable( filter: { queryName: { eq: "PUBLISHED_TALKS" } } ) {
					edges {
						node {
							data {
								title
							}
							fields {
								slug
							}
						}
					}
				}
			}
		`).then(result => {
				resolvePage(result, {
					queryName: 'allAirtable',
					templatePath: './src/templates/talk.js',
					urlPath: '/talks',
				});
			})

			// Speakers

			.then(() => {
				graphql(`
				{
					allAirtable( filter: { queryName: { eq: "PUBLISHED_SPEAKERS" } } ) {
						edges {
							node {
								data {
									name
								}
								fields {
									slug
								}
							}
						}
					}
				}
			`).then(result => {
					resolvePage(result, {
						queryName: 'allAirtable',
						templatePath: './src/templates/speaker.js',
						urlPath: '/speakers',
					});
				})
			})

			// TOPICS

			.then(() => {
				graphql(`
				{
					allAirtable( filter: { queryName: { eq: "PUBLISHED_TOPICS" } } ) {
						edges {
							node {
								data {
									name
								}
								fields {
									slug
								}
							}
						}
					}
				}
			`)
				.then(result => {
					resolvePage(result, {
						queryName: 'allAirtable',
						templatePath: './src/templates/topic.js',
						urlPath: '/topics',
					});
				})
			})
  });
};