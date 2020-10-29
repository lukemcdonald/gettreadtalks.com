import dotenv from 'dotenv';
import config from './config';

dotenv.config({ path: '.env' });

export default {
	siteMetadata: {
		keywords: 'sermon, workout, health, bible, pastor, speaker, talk, tread',
		...config,
	},
	plugins: [
		'gatsby-plugin-postcss',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-robots-txt',
		'gatsby-plugin-sharp',
		'gatsby-plugin-sitemap',
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
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `@raae/gatsby-remark-oembed`,
						options: {
							providers: {
								include: ['Vimeo', 'YouTube'],
							},
						},
					},
				],
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
						tableName: `Affiliate Links`,
						tableView: `Published`,
						queryName: `PUBLISHED_AFFILIATE_LINKS`,
						mapping: {
							image: `fileNode`,
							description: `text/markdown`,
							link: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Clips`,
						tableView: `Published`,
						queryName: `PUBLISHED_CLIPS`,
						tableLinks: [`speakers`, `topics`, `talks`],
						mapping: {
							link: `text/markdown`,
						},
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
						tableName: `Series`,
						tableView: `Published`,
						queryName: `PUBLISHED_SERIES`,
						tableLinks: [`talks`],
						mapping: {
							link: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Speakers`,
						tableView: `Published`,
						queryName: `PUBLISHED_SPEAKERS`,
						tableLinks: [`clips`, `talks`],
						mapping: {
							avatar: `fileNode`,
							description: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Talks`,
						tableView: `Published`,
						queryName: `PUBLISHED_TALKS`,
						tableLinks: [`series`, `speakers`, `topics`],
						mapping: {
							link: `text/markdown`,
						},
					},
					{
						baseId: process.env.AIRTABLE_BASE,
						tableName: `Topics`,
						tableView: `Published`,
						queryName: `PUBLISHED_TOPICS`,
						tableLinks: [`clips`, `talks`],
					},
				],
			},
		},
		`gatsby-plugin-netlify`,
	],
};
