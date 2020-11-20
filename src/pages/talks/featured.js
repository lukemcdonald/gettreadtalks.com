import React from 'react';
import { graphql } from 'gatsby';
import { getCurrentPosts } from '../../utilities';

import SEO from '../../components/seo';
import Talks from '../../components/talks';
import Section from '../../components/section';
import Link from '../../components/link';

export default function FeaturedTalksPage({ data, location }) {
	const { talks } = data;
	const currentTalks = getCurrentPosts(talks.nodes);

	return (
		<>
			<SEO title="Featured Talks" location={location} />

			<Section>
				<Section.Sidebar sticky>
					<Section.Heading as="h1">Featured Talks</Section.Heading>

					<div className="mb-8 prose">
						<p>Hand picked talks to elevate your spiritual heartbeat.</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Talks className="grid grid-cols-1 gap-6" talks={currentTalks} />
				</Section.Content>

				<Section.Sidebar right>
					<Link className="font-medium" to="/talks/">
						&larr; All Talks
					</Link>
				</Section.Sidebar>
			</Section>
		</>
	);
}

export const query = graphql`
	query {
		talks: allAirtableTalk(
			filter: { data: { favorite: { eq: true }, publishedDate: { ne: null } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
				id
				data {
					title
					publishedDate(formatString: "YYYYMMDD")
					scripture
					favorite
					speakers {
						id
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
						fields {
							slug
						}
					}
				}
				fields {
					slug
				}
			}
		}
	}
`;
