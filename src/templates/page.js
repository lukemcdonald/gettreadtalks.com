import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Container } from '../components/styled/layout';
import { Article, Header, Title, Content } from '../components/styled/article';

export default props => {
	const { data: post } = props.data.airtable;

	return (
		<Layout main={{ bg: 'white' }}>
			<SEO
				title={post.title}
				description={post.content.childMarkdownRemark.excerpt}
				pathname={post.path}
			/>

			<Container>
				<Article>
					<Header>
						<Title>{post.title}</Title>
					</Header>
					<Content
						dangerouslySetInnerHTML={{
							__html: post.content.childMarkdownRemark.html,
						}}
					/>
				</Article>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query($id: String!) {
		airtable(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
				path
				content {
					childMarkdownRemark {
						excerpt
						html
					}
				}
			}
		}
	}
`;
