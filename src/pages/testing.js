import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default (props) => (
  <Layout>
		<SEO title="Home" keywords={['gatsby', 'application', 'react']} />
		<ol>
			{props.data.allSitePage.edges.map(({node}) => (
				<li key={node.path}>
					<Link to={node.path}>{node.path}</Link>
				</li>
			))}
		</ol>
	</Layout>
)

export const pageQuery = graphql`
  query {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`;
