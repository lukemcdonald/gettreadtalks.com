import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const TestPage = (props) => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
		{props.data.allSitePage.edges.map(({node}) => {
			console.log(node);
			return (
			<p key={node.path}>
				<Link to={node.path}>{node.path}</Link>
			</p>
		)})}
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
