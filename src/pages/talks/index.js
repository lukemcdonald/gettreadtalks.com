import React from 'react';
import { graphql } from 'gatsby';

import Page from '../../components/page';
import Section from '../../components/section';
import Select from '../../components/select';
import SEO from '../../components/seo';
import Talks from '../../components/talks';

import ChevronRightIcon from '../../assets/svgs/icon-chevron-right.svg';

export default function TalksPage({ data, location, pageContext }) {
	const { talks, topics } = data;
	const isTopical = topics?.nodes && pageContext?.topic;
	const description = `Christ centered talks ${
		isTopical && `on ${pageContext.topic}`
	} elevate your spiritual heartbeat.`;

	const test = topics.nodes.map((topic) => ({
		value: topic.fields.slug,
		label: topic.data.title,
	}));

	const two = [
		{
			value: '/talks/',
			label: 'All Talks',
		},
		{
			value: '/talks/featured/',
			label: 'Featured Talks',
		},
	];

	return (
		<>
			<SEO title="Talks" description={description} location={location} />

			<Section>
				<Section.Sidebar>
					{isTopical && <Section.Heading as="h2">Talks On</Section.Heading>}

					<Page.Title className="relative">
						<span>
							<span className="invisible">
								{isTopical ? pageContext.topic : 'All Talks'}
							</span>
							<ChevronRightIcon className="inline-block w-8 mb-px ml-1 transform rotate-90" />
						</span>

						<Select className="absolute inset-0" current={pageContext.slug}>
							<Select.Group
								label="Talks"
								options={[
									{
										value: '/talks/',
										label: 'All Talks',
									},
									{
										value: '/talks/featured/',
										label: 'Featured Talks',
									},
								]}
							/>

							<Select.Group
								label="Topics"
								options={topics.nodes.map((topic) => ({
									value: topic.fields.slug,
									label: topic.data.title,
								}))}
							/>
						</Select>

						{/* <TopicsFilter
							className="absolute inset-0"
							label="Choose a Topic"
							topics={topics.nodes}
							currentTopic={{ to: pageContext.slug, text: pageContext.topic }}
						/> */}
					</Page.Title>

					<div className="mt-2 prose">
						<p>{description}</p>
					</div>
				</Section.Sidebar>

				<Section.Content>
					<Talks className="grid grid-cols-1 gap-6" talks={talks.nodes} />
					{/* <Pagination pageContext={pageContext} /> */}
				</Section.Content>
			</Section>
		</>
	);
}

export const query = graphql`
	query($topic: [String]) {
		talks: allAirtableTalk(
			filter: {
				data: {
					publishedDate: { ne: null }
					topics: { elemMatch: { data: { title: { in: $topic } } } }
				}
			}
			sort: { fields: data___publishedDate, order: DESC }
		) {
			nodes {
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
		topics: allAirtableTopic(sort: { fields: data___title, order: ASC }) {
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					publishedTalksCount
				}
			}
		}
	}
`;
