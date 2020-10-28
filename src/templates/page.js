import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';

export default function SinglePage({ data }) {
	const { data: page } = data.airtable;

	return (
		<>
			<SEO
				title={page.title}
				description={page.content.childMarkdownRemark.excerpt}
				pathname={page.path}
			/>

			<div>
				<section>
					<header>
						<h1>{page.title}</h1>
					</header>
					<div
						dangerouslySetInnerHTML={{
							__html: page.content.childMarkdownRemark.html,
						}}
					/>
				</section>
			</div>
		</>
	);
}

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
