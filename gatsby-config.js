const config = require('./config');

require('dotenv').config({
	path: `.env`,
});

const publishedTalksQuery = `{
	allAirtable(
		filter: { queryName: { eq: "PUBLISHED_TALKS" } }
		sort: { fields: data___publishedDate, order: DESC }
	) {
		edges {
			node {
				id
				fields {
					slug
				}
				data {
					title
					scripture
					speakers {
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
		}
	}
}`;

const searchQueries = [
	{
		indexName: `prod_PUBLISHED_TALKS`,
		query: publishedTalksQuery,
		transformer: ({ data }) => data.allAirtable.edges.map(({ node }) => node), // optional
		settings: {
			attributesToSnippet: ['path:5', 'internal'],
		},
	},
];

module.exports = {
	siteMetadata: {
		siteUrl: config.url,
		title: config.title,
		tagline: config.tagline,
		description: config.description,
		author: '@thelukemcdonald',
		keywords:
			'tread, talks, jesus, christ, God, religion, sermons, salvation, bible, biblical, audio, video',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-robots-txt',
		'gatsby-plugin-sharp',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-tailwindcss',
		`gatsby-transformer-remark`,
		'gatsby-transformer-sharp',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/images`,
			},
		},
		{
			resolve: `gatsby-plugin-algolia`,
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.GATSBY_ALGOLIA_API_KEY_ADMIN,
				indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
				queries: searchQueries,
				chunkSize: 10000, // default: 1000
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: 'GTM-TZ97LN8',
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: config.title,
				short_name: config.title,
				description: config.description,
				start_url: '/',
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'minimal-ui',
				icon: config.icon,
			},
		},
		{
			resolve: `gatsby-source-airtable`,
			options: {
				apiKey: process.env.AIRTABLE_API_KEY,
				tables: [
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Talks`,
						tableView: `All Talks`,
						queryName: `ALL_TALKS`,
						tableLinks: [`speakers`, `topics`],
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Talks`,
						tableView: `Published`,
						queryName: `PUBLISHED_TALKS`,
						tableLinks: [`speakers`, `topics`],
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Speakers`,
						tableView: `All Speakers`,
						queryName: `ALL_SPEAKERS`,
						tableLinks: [`talks`],
						mapping: {
							avatar: `fileNode`,
							description: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Speakers`,
						tableView: `Published`,
						queryName: `PUBLISHED_SPEAKERS`,
						tableLinks: [`talks`],
						mapping: {
							avatar: `fileNode`,
							description: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Topics`,
						tableView: `All Topics`,
						queryName: `ALL_TOPICS`,
						tableLinks: [`talks`],
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Topics`,
						tableView: `Published`,
						queryName: `PUBLISHED_TOPICS`,
						tableLinks: [`talks`],
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Pages`,
						tableView: `Published`,
						queryName: `PUBLISHED_PAGES`,
						mapping: {
							content: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Affiliate Links`,
						tableView: `All Links`,
						queryName: `ALL_AFFILIATE_LINKS`,
						mapping: {
							image: `fileNode`,
							description: `text/markdown`,
						},
					},
				],
			},
		},
		`gatsby-plugin-netlify`,
	],
};
