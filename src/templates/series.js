import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Intro from '../components/intro';
import { Container, Section } from '../components/styled/layout';
import Talks from '../components/talks';

export default props => {
	const { data: post } = props.data.airtable;
	// const { edges: talks = [] } = props.data.talks;

	return (
		<Layout>
			<SEO
				title={post.title}
				pathname={post.path}
			/>

			<Intro title={post.title} excerpt={''} />

			<Container>
				<Section>
					<Talks data={post.talks} />
				</Section>
			</Container>
		</Layout>
	);
};

export const pageQuery = graphql`
	query ($id: String!) {
		airtable(id: {eq: $id}) {
			id
			fields {
				slug
			}
			data {
				title
				talks {
					fields {
						slug
					}
					data {
						title
						path
						scripture
						speakers {
							id
							fields {
								slug
							}
							data {
								title
								avatar {
									localFiles {
										childImageSharp {
											fluid(maxWidth: 128) {
												...GatsbyImageSharpFluid_tracedSVG
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
