const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === `Airtable` && node.table === `Talks`) {
    slug = `/${node.data.title.replace(/ /g, "-")
      .replace(/[,&]/g, "")
      .toLowerCase()}/`;

    // Add slug as a field on the node.
    createNodeField({
			node,
			name: `slug`,
			value: slug
		});
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
		function resolvePage(result, { queryName, templatePath, urlPath = '' }) {
			const { data, errors } = result;

			if (errors) {
				console.log(errors);
				reject(errors);
			}

			const template = path.resolve(templatePath);

			data[queryName].edges.forEach(edge => {
				const { id, fields, data } = edge.node;
				createPage({
					path: `${urlPath}${fields.slug}`,
					component: slash(template),
					context: {
						id,
						title: data.title
					}
				});
			});

			resolve();
		}

    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(`
				{
					allAirtable(filter: { table: { eq: "Talks" } }) {
						edges {
							node {
								id
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
    );
  });
};