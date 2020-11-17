import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Section from '../components/section';

export default function SinglePage({ data, location }) {
	const { data: page } = data.page;

	return (
		<>
			<SEO
				title={page.title}
				description={page.content.childMarkdownRemark.excerpt}
				location={location}
			/>

			<Section>
				<Section.Content as="article" className="prose prose-lg">
					<header>
						<h1 className="text-4xl text-gray-900">{page.title}</h1>
					</header>

					<div
						dangerouslySetInnerHTML={{
							__html: page.content.childMarkdownRemark.html,
						}}
					/>
				</Section.Content>
			</Section>
		</>
	);
}

export const pageQuery = graphql`
	query($id: String!) {
		page: airtablePage(id: { eq: $id }) {
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
