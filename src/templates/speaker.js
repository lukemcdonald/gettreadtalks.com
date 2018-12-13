import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts';
import SEO from '../components/seo';

export default props => {
	const { data: post } = props.data.airtable;

	return (
		<Layout>
			<SEO title={post.name} />
			<h2>{post.name}</h2>
		</Layout>
	);
};

export const pageQuery = graphql`
	query($id: String!) {
		airtable(id: { eq: $id }) {
			id
			data {
				name
			}
		}
	}
`;
