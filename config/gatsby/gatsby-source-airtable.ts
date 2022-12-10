import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

export default {
  resolve: 'gatsby-source-airtable',
  options: {
    apiKey: process.env.AIRTABLE_API_KEY,
    tables: [
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Affiliate Links',
        tableView: 'Published',
        queryName: 'AffiliateLink',
        mapping: {
          image: 'fileNode',
          description: 'text/markdown',
          link: 'text/markdown',
        },
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Clips',
        tableView: 'Published',
        queryName: 'Clip',
        tableLinks: ['speakers', 'topics', 'talks'],
        mapping: {
          link: 'text/markdown',
        },
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Pages',
        tableView: 'Published',
        queryName: 'Page',
        mapping: {
          content: 'text/markdown',
        },
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Scriptures',
        tableView: 'All Scriptures',
        queryName: 'Scripture',
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Series',
        tableView: 'Published',
        queryName: 'Serie',
        tableLinks: ['speakers', 'talks'],
        mapping: {
          link: 'text/markdown',
        },
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Speakers',
        tableView: 'Published',
        queryName: 'Speaker',
        tableLinks: ['clips', 'talks'],
        mapping: {
          avatar: 'fileNode',
          banner: 'fileNode',
          description: 'text/markdown',
        },
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Talks',
        tableView: 'Published',
        queryName: 'Talk',
        tableLinks: ['series', 'speakers', 'topics'],
        mapping: {
          link: 'text/markdown',
        },
        separateNodeType: true,
      },
      {
        baseId: process.env.AIRTABLE_BASE,
        tableName: 'Topics',
        tableView: 'Published',
        queryName: 'Topic',
        tableLinks: ['clips', 'talks'],
        separateNodeType: true,
      },
    ],
  },
}
