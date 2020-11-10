import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Section, { Content, Heading, Sidebar } from '../components/section';
import { replaceAll } from '../utilities';
import Intro from '../components/intro';

export default function Talk({ data, location }) {
	const { data: talk } = data.talk;
	const media = talk?.link?.childMarkdownRemark;
	const video = media?.htmlAst.children[0].children[0];
	const hasVideo = media?.htmlAst.children[0].children[0].tagName === 'iframe';
	console.log(media.html);

	return (
		<>
			<SEO
				title={`${talk.title} by ${talk.speaker}`}
				description={`Listen to ${talk.title} by ${talk.speaker} from ${talk.scripture}.`}
				location={location}
			/>

			{hasVideo && (
				<Intro className="py-16">
					<figure
						className="embed-responsive aspect-ratio-16x9"
						dangerouslySetInnerHTML={{
							__html: media.html.replace(/<p>|<\/p>/g, ''),
						}}
					/>
				</Intro>
			)}

			<Section>
				<Sidebar>
					<Heading>Topics</Heading>
					<ul>
						<li>TOPIC name</li>
					</ul>
				</Sidebar>
				<Content>
					<h1>{talk.title}</h1>
					<h2>
						By {talk.speaker} from {talk.scripture}
					</h2>
				</Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query($id: String!) {
		talk: airtableTalk(id: { eq: $id }) {
			id
			data {
				title
				link {
					childMarkdownRemark {
						html
						htmlAst
						rawMarkdownBody
					}
				}
				scripture
				topics {
					data {
						title
						publishedTalksCount
					}
				}
				speakers {
					id
					fields {
						slug
					}
					data {
						title
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
