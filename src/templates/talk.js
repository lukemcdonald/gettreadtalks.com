/* global tw */
import styled from 'styled-components';
import React from 'react';
import { graphql } from 'gatsby';
import Link from '../components/link';
import { mapObjectToString, objectToString } from '../utils';

import Layout from '../layouts';
import SEO from '../components/seo';
import Intro from '../components/intro';
import { Container, Section } from '../components/styled/layout';
import { MetaText } from '../components/styled/meta';
import Topics from '../components/topics';

const SectionHeading = styled(MetaText)`
	${tw`my-3 py-2`};
`;

export default props => {
	const { data: post } = props.data.airtable;
	const speaker = post.speakers.map(({ data }) => data);

	const meta = {
		title: post.title,
		speaker: speaker[0].name ? `<em>by</em> ${speaker[0].name}` : '',
		scripture: post.scripture ? `<em>from</em> ${post.scripture}` : '',
		topics: post.topics
			? `on ${post.topics.map(({ data }) => data.name).join(', ')}`
			: '',
	};

	return (
		<Layout>
			<SEO
				title={mapObjectToString(['title', 'speaker'], meta)}
				description={objectToString(meta)}
			/>

			<Intro
				title={post.title}
				text={mapObjectToString(['speaker', 'scripture'], meta)}
			/>

			{post.topics && (
				<Container>
					<Section>
						<SectionHeading as="h2">Related Topics</SectionHeading>
					</Section>

					<Section>
						<Topics data={post.topics} />
					</Section>
				</Container>
			)}
		</Layout>
	);
};

export const pageQuery = graphql`
	query($id: String!) {
		airtable(id: { eq: $id }) {
			id
			data {
				title
				link
				scripture
				topics {
					id
					fields {
						slug
					}
					data {
						name
						publishedTalksCount
					}
				}
				speakers {
					id
					fields {
						slug
					}
					data {
						name
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
`;
