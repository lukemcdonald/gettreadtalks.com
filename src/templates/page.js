import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';

export default function SinglePage({ data }) {
	const { data: page } = data.page;

	return (
		<article className="m-auto mt-12 prose prose-lg">
			<SEO
				title={page.title}
				description={page.content.childMarkdownRemark.excerpt}
				pathname={page.path}
			/>

			<header>
				<h1 className="text-4xl text-gray-900">{page.title}</h1>
			</header>

			<div
				dangerouslySetInnerHTML={{
					__html: page.content.childMarkdownRemark.html,
				}}
			/>
		</article>
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
