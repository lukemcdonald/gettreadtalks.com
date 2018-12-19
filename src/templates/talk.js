/* global tw */
import styled from 'styled-components';
import React from 'react';
import { graphql } from 'gatsby';
import Link from '../components/link';
import { mapObjectToString, objectToString } from '../utils';

import Layout from '../layouts';
import SEO from '../components/seo';
import Intro from '../components/intro';
import Topics from '../components/topics';
import Speakers from '../components/speakers';

import { Container, Section } from '../components/styled/layout';
import { SecondaryButton } from '../components/styled/button';

const TalkLink = styled(SecondaryButton)`
	${tw`m-auto mt-16`};
	${tw`md:w-1/3`};
`;

const SectionHeading = styled.h2`
	${tw`block no-underline my-3 py-2 text-grey-darkest text-sm tracking-wide uppercase`}
`;

export default props => {
	const { data: post } = props.data.airtable;

	const meta = {
		title: post.title,
		speakers: post.speakers
			? `<em>by</em> ${post.speakers.map(({ data }) => data.name).join(', ')}`
			: null,
		scripture: post.scripture ? `<em>from</em> ${post.scripture}` : null,
		topics: post.topics
			? `<em>on</em> ${post.topics.map(({ data }) => data.name).join(', ')}`
			: null,
	};

	console.log(objectToString(meta));

	return (
		<Layout>
			<SEO
				title={mapObjectToString(['title', 'speakers'], meta)}
				description={objectToString(meta)}
			/>

			<Intro
				title={post.title}
				excerpt={mapObjectToString(['speakers', 'scripture'], meta)}
			>
				<p>
					<TalkLink to={post.link} as={Link} large={true}>
						Listen to Talk &rarr;
					</TalkLink>
				</p>
			</Intro>

			<Container>
				{post.speakers && (
					<Section>
						<SectionHeading>Speaker</SectionHeading>
						<Speakers data={post.speakers} />
					</Section>
				)}

				{post.topics && (
					<Section>
						<SectionHeading>
							{post.topics === 1 ? `Topic` : `Topics`}
							{console.log(post.topics)}
						</SectionHeading>
						<Topics data={post.topics} />
					</Section>
				)}
			</Container>
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
						role
						ministry
						website
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
