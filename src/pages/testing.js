import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const TestPage = (props) => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
		{props.data.allSitePage.edges.map(edge => (
			<p key={edge.node.path}>
				<Link to={edge.node.path}>{edge.node.path}</Link>
			</p>
		))}
	</Layout>
)

export default TestPage;

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
