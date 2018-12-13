import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts';
import SEO from '../components/seo';

export default props => {
	const { data: post } = props.data.airtable;
	console.log(props);

	return (
		<Layout>
			<SEO title={post.title} />
			<h2>{post.title}</h2>
		</Layout>
	);
};

export const pageQuery = graphql`
	query($id: String!) {
		airtable(id: { eq: $id }) {
			id
			data {
				title
			}
		}
	}
`;
