// Note: Changing this to a typscript file will cause the terminal to be in loop of sorts.
import type { CreateNodeArgs, CreatePagesArgs, GatsbyNode } from 'gatsby'
import { resolve } from 'path'
import slugify from 'slugify'

import type { TAny } from '~/utils/types/shared'

const onCreateAirtableNode = ({ node, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions
  const { type } = node.internal
  const slugifyArgs = {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  }
  const data = node.data as {
    slug: string
    speaker: string
    title: string
  }

  const field = {
    slug: '',
    title: slugify(data.title, slugifyArgs),
  }

  if (type === 'AirtableClip') {
    // todos: Find a way to get foreign-key field info for speakers and remove use of speaker field value.
    const speaker = slugify(data.speaker[0], slugifyArgs)
    field.slug = `/clips/${speaker}/${field.title}/`
  }

  if (type === 'AirtablePage') {
    field.slug = `/${field.title}/`
  }

  if (type === 'AirtableSerie') {
    field.slug = `/series/${field.title}/`
  }

  if (type === 'AirtableSpeaker') {
    field.slug = `/speakers/${field.title}/`
  }

  if (type === 'AirtableTalk') {
    // todo: Get foreign-key field info for speakers and remove use of speaker field value.
    const speaker = slugify(data.speaker[0], slugifyArgs)
    field.slug = `/talks/${speaker}/${field.title}/`
  }

  if (type === 'AirtableTopic') {
    field.slug = `/topics/${field.title}/`
  }

  createNodeField({
    name: 'id',
    node,
    value: node.recordId,
  })

  createNodeField({
    name: 'slug',
    node,
    value: field.slug.toLowerCase() || '',
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const airtableTypes = [
    'AirtableClip',
    'AirtablePage',
    'AirtableSerie',
    'AirtableSpeaker',
    'AirtableTalk',
    'AirtableTopic',
  ]

  const data = node.data || {}
  const hasData = Object.keys(data).length > 0
  const hasAirtableType = airtableTypes.includes(node.internal.type)

  /**
   * Create data on the node fields property.
   *
   * 1. Node type is a whitelisted Airtable
   * 2. Node data is not empty (empty table row in Airtable)
   */
  if (hasAirtableType && hasData) {
    onCreateAirtableNode({ node, actions } as CreateNodeArgs)
  }
}

interface CreatePagePostData {
  data: {
    title: string
  }
  fields: {
    slug: string
  }
  id: string
}

async function createClipPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const pageQuery: {
    data?: { clips: { nodes: CreatePagePostData[] } }
    errors?: TAny
  } = await graphql(`
    query Clips {
      clips: allAirtableClip(filter: { data: { title: { ne: null } } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (pageQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for Clips.')
    return
  }

  pageQuery.data?.clips.nodes.forEach((page) => {
    actions.createPage({
      path: page.fields.slug,
      component: resolve('./src/templates/clip.tsx'),
      context: {
        id: page.id,
        slug: page.fields.slug,
      },
    })
  })
}

async function createPagePages({ graphql, actions, reporter }: CreatePagesArgs) {
  const pageQuery: {
    data?: { pages: { nodes: CreatePagePostData[] } }
    errors?: TAny
  } = await graphql(`
    query Pages {
      pages: allAirtablePage(filter: { data: { title: { ne: null } } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (pageQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for Pages.')
    return
  }

  pageQuery.data?.pages.nodes.forEach((page) => {
    actions.createPage({
      path: page.fields.slug,
      component: resolve('./src/templates/page.tsx'),
      context: {
        id: page.id,
        slug: page.fields.slug,
      },
    })
  })
}

async function createSeriesPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const pageQuery: {
    data?: { series: { nodes: CreatePagePostData[] } }
    errors?: TAny
  } = await graphql(`
    query Series {
      series: allAirtableSerie(filter: { data: { title: { ne: null } } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (pageQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for Series.')
    return
  }

  pageQuery.data?.series.nodes.forEach((page) => {
    actions.createPage({
      path: page.fields.slug,
      component: resolve('./src/templates/series.tsx'),
      context: {
        id: page.id,
        slug: page.fields.slug,
      },
    })
  })
}

async function createSpeakerPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const pageQuery: {
    data?: { speakers: { nodes: CreatePagePostData[] } }
    errors?: TAny
  } = await graphql(`
    query Speakers {
      speakers: allAirtableSpeaker(filter: { data: { title: { ne: null } } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (pageQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for Speakers.')
    return
  }

  pageQuery.data?.speakers.nodes.forEach((page) => {
    actions.createPage({
      path: page.fields.slug,
      component: resolve('./src/templates/speaker.tsx'),
      context: {
        id: page.id,
        slug: page.fields.slug,
      },
    })
  })
}

async function createTalkPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const pageQuery: {
    data?: { talks: { nodes: CreatePagePostData[]; totalCount: number } }
    errors?: TAny
  } = await graphql(`
    query Talks {
      talks: allAirtableTalk(filter: { data: { title: { ne: null } } }) {
        totalCount
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (pageQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for Talks.')
    return
  }

  if (pageQuery.data?.talks.totalCount) {
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE ?? '8', 8)
    const pageCount = Math.ceil(pageQuery.data.talks.totalCount / pageSize)

    Array.from({ length: pageCount }).forEach((_, i) => {
      actions.createPage({
        path: `/talks/${i + 1}`,
        component: resolve('./src/pages/talks/index.tsx'),
        context: {
          skip: i * pageSize,
          currentPage: i + 1,
          pageSize,
        },
      })
    })
  }

  pageQuery.data?.talks.nodes.forEach((page) => {
    actions.createPage({
      path: page.fields.slug,
      component: resolve('./src/templates/talk.tsx'),
      context: {
        id: page.id,
        slug: page.fields.slug,
      },
    })
  })
}

async function createTopicPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const pageQuery: {
    data?: { topics: { nodes: CreatePagePostData[] } }
    errors?: TAny
  } = await graphql(`
    query Topics {
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
  `)

  if (pageQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for Topics.')
    return
  }

  pageQuery.data?.topics.nodes.forEach((page) => {
    actions.createPage({
      path: page.fields.slug,
      component: resolve('./src/pages/talks/index.tsx'),
      context: {
        id: page.id,
        slug: page.fields.slug,
        topic: page.data.title,
      },
    })
  })
}

export const createPages: GatsbyNode['createPages'] = async (params) => {
  await Promise.all([
    createClipPages(params),
    createPagePages(params),
    createSeriesPages(params),
    createSpeakerPages(params),
    createTalkPages(params),
    createTopicPages(params),
  ])
}
