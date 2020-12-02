import React from 'react';
import { graphql } from 'gatsby';

import Page from '../../components/page';
import SEO from '../../components/seo';
import Speakers from '../../components/speakers';
import Section from '../../components/section';
import SpeakersFilter from '../../components/speakers/filter';
import Card from '../../components/card';

export default function SpeakersPage({ data, location, pageContext }) {
	const { speakers } = data;

	return (
		<>
			<SEO title="Speakers" location={location} />

			<Section>
				<Section.Sidebar className="hidden" sticky>
					<Page.Title>
						<SpeakersFilter
							speakers={speakers.nodes}
							current={{
								value: pageContext.slug,
								label: pageContext.speaker,
							}}
						/>
					</Page.Title>

					<div className="mt-2 prose">
						<p>
							Listen to <em>{speakers.totalCount}</em> faithful ambassadors of
							Christ and be blessed.
						</p>
					</div>

					{/* <Pagination
						className="mt-6"
						pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
						totalCount={speakers.totalCount}
						currentPage={pageContext.currentPage || 1}
						base="/speakers"
						showPageNumbers
					/> */}
				</Section.Sidebar>

				<Section.Content align="full">
					<Speakers
						className="grid gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4"
						size="small"
						speakers={speakers.nodes}
						disable={['ministry']}
					>
						<Card className="items-start row-span-2 px-6 py-5">
							<div>
								<Page.Title>
									<SpeakersFilter
										className=""
										speakers={speakers.nodes}
										current={{
											value: pageContext.slug,
											label: pageContext.speaker,
										}}
									/>
								</Page.Title>

								<div className="mt-2 prose">
									<p>
										Listen to <em>{speakers.totalCount}</em> faithful
										ambassadors of Christ and be blessed.
									</p>
								</div>
							</div>
						</Card>
					</Speakers>
				</Section.Content>
			</Section>
		</>
	);
}

export const pageQuery = graphql`
	# query($skip: Int = 0, $pageSize: Int = 12) {
	query {
		speakers: allAirtableSpeaker(
			# skip: $skip
			# limit: $pageSize
			filter: { data: { title: { ne: null }, publishedTalksCount: { gte: 1 } } }
			sort: { fields: data___lastName, order: ASC }
		) {
			totalCount
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					favorite
					firstName
					lastName
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
					talks {
						id
					}
				}
			}
		}
	}
`;
