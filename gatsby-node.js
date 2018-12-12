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

  if (node.internal.type === `Airtable` && node.table === `Talks`) {
    createNodeField({
			node,
			name: `slug`,
			value: toSlug(node.data.title)
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

			data[queryName].edges.forEach(edge => {
				const { id, fields, data } = edge.node;
				createPage({
					path: `${urlPath}/${fields.slug}`,
					component: slash(template),
					context: {
						id,
						title: data.title,
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