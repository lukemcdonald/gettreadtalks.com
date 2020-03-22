/* global tw */
import styled from 'styled-components';
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Link from '../components/link';
import { mapObjectToString, objectToString } from '../utils';

import urlParser from 'js-video-url-parser';

import Intro from '../components/intro';
import Layout from '../components/layout';
import SEO from '../components/seo';

import Speakers from '../components/speakers';
import Topics from '../components/topics';
import Talks from '../components/talks';

import { Container, Section, SectionTitle } from '../components/styled/layout';
import { SecondaryButton } from '../components/styled/button';

const ClipLink = styled(SecondaryButton)`
	${tw`m-auto mt-16`};
	${tw`md:w-1/3`};
`;

const Media = styled.div`
	${tw`mt-12 bg-black relative z-50`};
`;

const Separator = styled.div`
${tw`mb-8`};
`;

export default class ReplyBox extends Component {

	constructor(props){
		super(props);

		this.state = {
			mediaUrl: '',
		}
	}

	componentDidMount() {
		this.setParsedMedia();
	}

	componentWillMount() {
		this.setParsedMedia();
	}

	getParsedMedia() {
		const mediaLink = this.props.data.airtable.data.link.childMarkdownRemark.rawMarkdownBody;
		return urlParser.parse(mediaLink);
	}

	setParsedMedia() {
		const parsedMedia = this.getParsedMedia();

		if ( parsedMedia ) {
			const mediaUrl = urlParser.create({
				videoInfo: parsedMedia,
				format: 'longImage',
			})

			this.setState({mediaUrl});
		}
	}

	render() {
		const { mediaUrl } = this.state;
		const { data: post } = this.props.data.airtable;

		const {
			html: mediaHtml,
			htmlAst: media,
		} = post.link.childMarkdownRemark;

		const mediaObject = media.children[0].children[0] || '';

		const meta = {
			title: post.title,
			speakers: post.speakers
				? `<em>by</em> ${post.speakers.map(({ data }) => data.title).join(', ')}`
				: null,
			talks: post.talks
				? `<em>on</em> ${post.talks.map(({ data }) => data.title).join(', ')}`
				: null,
			topics: post.topics
				? `<em>on</em> ${post.topics.map(({ data }) => data.title).join(', ')}`
				: null,
		};

		return (
			<Layout>
				<SEO
					title={mapObjectToString(['title', 'speakers'], meta)}
					description={objectToString(meta)}
					pathname={post.path}
					image={mediaUrl}
				/>

				<Intro
					title={post.title}
					excerpt={mapObjectToString(['speakers'], meta)}
				>
					{ 'iframe' === mediaObject.tagName && (
						<Media
							className="responsive-media"
							dangerouslySetInnerHTML={{ __html: mediaHtml }}
							style={{marginBottom: `-3px`}}
						/>
					)}

					{ 'a' === mediaObject.tagName && (
						<p>
							<ClipLink to={mediaObject.properties.href} as={Link} large={1}>
								Listen to Clip &rarr;
							</ClipLink>
							{ post.talks && (
								<Separator />
							)}
						</p>
					)}

					{post.talks && (
						<div>
							<Talks data={post.talks} subtitle="Related Talk:" />
						</div>
					)}

				</Intro>

				<Container>
					{post.speakers && (
						<Section>
							<SectionTitle>
								{1 === post.speakers.length ? `Speaker` : `Speakers`}
							</SectionTitle>
							<Speakers data={post.speakers} />
						</Section>
					)}

					{post.topics && (
						<Section>
							<SectionTitle>
								{1 === post.topics.length ? `Topic` : `Topics`}
							</SectionTitle>
							<Topics data={post.topics} />
						</Section>
					)}

				</Container>
			</Layout>
		);
	}
};

export const pageQuery = graphql`
	query($id: String!) {
		airtable(id: { eq: $id }) {
			id
			data {
				title
				path
				link {
					childMarkdownRemark {
						html
						htmlAst
						rawMarkdownBody
					}
				}
				talks {
					id
					fields {
						slug
					}
					data {
						title
						publishedDate(formatString:"YYYYMMDD")
						scripture
						speakers {
							id
							fields {
								slug
							}
							data {
								title
							}
						}
					}
				}
				topics {
					id
					fields {
						slug
					}
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
