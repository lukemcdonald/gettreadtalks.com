import React from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import SEO from '../components/seo';
import Section, { Content, Heading, Sidebar } from '../components/section';
import Intro from '../components/intro';

import IntroStyles from '../components/intro.module.css';

export default function Talk({ data, location }) {
	const { data: talk } = data.talk;
	const media = talk?.link?.childMarkdownRemark;
	const hasVideo = media?.htmlAst.children[0].children[0].tagName === 'iframe';

	return (
		<>
			<SEO
				title={`${talk.title} by ${talk.speaker}`}
				description={`Listen to ${talk.title} by ${talk.speaker} from ${talk.scripture}.`}
				location={location}
			/>

			{hasVideo && (
				<Intro
					className={IntroStyles.bgGradient}
					align="wide"
					fullscreen
					title={talk.title}
					excerpt={`${talk.speaker} ${
						talk.scripture
							? `<span class="text-gray-500">&bull;</span> ${talk.scripture}`
							: ''
					}`}
				>
					<figure
						className="mt-10 rounded shadow-lg embed-responsive aspect-ratio-16x9"
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
				speaker
				topics {
					data {
						title
						publishedTalksCount
					}
				}
			}
		}
	}
`;
