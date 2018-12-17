const config = require('./data/siteConfig');

require('dotenv').config({
	path: `.env`,
});

module.exports = {
	siteMetadata: {
		siteUrl: config.siteUrl,
		title: config.siteTitle,
		tagline: config.siteTagline,
		description: config.siteDescription,
		author: 'Luke McDonald',
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
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: 'GTM-TZ97LN8',
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: config.siteTitle,
				short_name: config.siteTitle,
				description: config.siteDescription,
				start_url: '/',
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'minimal-ui',
				icon: config.siteIcon,
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
							banner: `fileNode`,
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
							banner: `fileNode`,
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
				],
			},
		},
	],
};
