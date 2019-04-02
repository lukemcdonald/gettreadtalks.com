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
// import ReplyBox from '../components/replyBox';

import { Container, Section, SectionTitle } from '../components/styled/layout';
import { SecondaryButton } from '../components/styled/button';

const TalkLink = styled(SecondaryButton)`
	${tw`m-auto mt-16`};
	${tw`md:w-1/3`};
`;

const Media = styled.div`
	${tw`mt-12`};
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
		const { id, mediaType, provider, mediaUrl } = this.state;
		const { data: post } = this.props.data.airtable;

		const {
			html: mediaHtml,
			htmlAst: media,
		} = post.link.childMarkdownRemark;

		const mediaObject = media.children[0].children[0];

		const meta = {
			title: post.title,
			speakers: post.speakers
				? `<em>by</em> ${post.speakers.map(({ data }) => data.title).join(', ')}`
				: null,
			scripture: post.scripture ? `<em>from</em> ${post.scripture}` : null,
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
					excerpt={mapObjectToString(['speakers', 'scripture'], meta)}
				>
					{mediaObject.tagName === 'iframe' && (
						<Media
							className="responsive-media"
							dangerouslySetInnerHTML={{ __html: mediaHtml }}
						/>
					)}

					{mediaObject.tagName === 'a' && (
						<p>
							<TalkLink to={mediaObject.properties.href} as={Link} large={1}>
								Listen to Talk &rarr;
							</TalkLink>
						</p>
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

				{/*
					<Container>
						<Section>
							<SectionTitle>Comments</SectionTitle>
							<ReplyBox />
						</Section>
					</Container>
				*/}
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
				scripture
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
