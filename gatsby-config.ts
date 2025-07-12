import type { GatsbyConfig } from 'gatsby'
import {
  gatsbyPluginFeed,
  gatsbyPluginReactSvg,
  gatsbyPluginRobotsTxt,
  gatsbyPluginSitemap,
  gatsbySourceAirtable,
  gatsbySourceFilesystem,
  gatsbyTransformerRemark,
  sentryGatsby,
} from './config/gatsby'

const config: GatsbyConfig = {
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  siteMetadata: {
    siteUrl: 'https://gettreadtalks.com',
    title: 'TREAD Talks',
    description:
      'Exercise your inner man with Christ centered sermons to elevate your spiritual heartbeat while working out your physical one.',
    tagline: 'Exercise your inner man.',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-netlify',
    'gatsby-plugin-postcss',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    gatsbyPluginFeed,
    gatsbyPluginReactSvg,
    gatsbyPluginRobotsTxt,
    gatsbyPluginSitemap,
    gatsbySourceAirtable,
    gatsbySourceFilesystem,
    gatsbyTransformerRemark,
    sentryGatsby,
  ],
}

export default config
