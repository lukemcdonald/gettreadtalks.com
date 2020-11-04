import React from 'react';
import { graphql } from 'gatsby';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Talks from '../components/talks';
import TalksNav from '../components/talks/nav';
import Pagination from '../components/pagination';

export default function ArchiveTalksPage({ data, pageContext }) {
	const { edges: talks = [] } = data.talks;

	return (
		<>
			<SEO
				title="Talks"
				keywords={['talks', 'sermons', 'treadtalks']}
				pathname="/talks/"
			/>

			<Intro
				title="Talks"
				excerpt="Weekly sermons to elevate your spiritual heartbeat."
			/>

			<section>
				<div>
					<TalksNav />
				</div>

				<div>
					<Talks talks={talks} />
				</div>

				<div>
					<Pagination pageContext={pageContext} />
				</div>
			</section>
		</>
	);
}

export const query = graphql`
	query($limit: Int!, $skip: Int!) {
		talks: allAirtableTalk(
			limit: $limit
			skip: $skip
			filter: { data: { publishedDate: { ne: null } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					data {
						title
						publishedDate(formatString: "YYYYMMDD")
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
