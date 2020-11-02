import React, { Component } from 'react';
import { graphql } from 'gatsby';
import urlParser from 'js-video-url-parser';
import Link from '../components/link';
import { mapObjectToString, objectToString } from '../utils';

import Intro from '../components/intro';
import SEO from '../components/seo';

import Speakers from '../components/speakers';
import Topics from '../components/topics';
import Talks from '../components/talks';

export default class SingleClipPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mediaUrl: '',
		};
	}

	componentDidMount() {
		this.setParsedMedia();
	}

	componentWillMount() {
		this.setParsedMedia();
	}

	getParsedMedia() {
		const mediaLink = this.props.data.clip.data.link.childMarkdownRemark
			.rawMarkdownBody;
		return urlParser.parse(mediaLink);
	}

	setParsedMedia() {
		const parsedMedia = this.getParsedMedia();

		if (parsedMedia) {
			const mediaUrl = urlParser.create({
				videoInfo: parsedMedia,
				format: 'longImage',
			});

			this.setState({ mediaUrl });
		}
	}

	render() {
		const { mediaUrl } = this.state;
		const { data: clip } = this.props.data.airtable;

		const { html: mediaHtml, htmlAst: media } = clip.link.childMarkdownRemark;

		const mediaObject = media.children[0].children[0] || '';

		const meta = {
			title: clip.title,
			speakers: clip.speakers
				? `<em>by</em> ${clip.speakers
						.map(({ data }) => data.title)
						.join(', ')}`
				: null,
			topics: clip.topics
				? `<em>on</em> ${clip.topics.map(({ data }) => data.title).join(', ')}`
				: null,
		};

		return (
			<>
				<SEO
					title={mapObjectToString(['title', 'speakers'], meta)}
					description={objectToString(meta)}
					pathname={clip.path}
					image={mediaUrl}
				/>

				<Intro
					title={clip.title}
					excerpt={mapObjectToString(['speakers'], meta)}
				>
					{mediaObject.tagName === 'iframe' && (
						<div
							className="responsive-media"
							dangerouslySetInnerHTML={{ __html: mediaHtml }}
							style={{ marginBottom: `-3px` }}
						/>
					)}

					{mediaObject.tagName === 'a' && (
						<p>
							<button
								type="button"
								to={mediaObject.properties.href}
								as={Link}
								large={1}
							>
								Listen to Clip &rarr;
							</button>

							{clip.talks && <div />}
						</p>
					)}

					{clip.talks && (
						<Talks talks={clip.talks} subtitle="Related Talk:" hideAvatar />
					)}
				</Intro>

				<div>
					{clip.speakers && (
						<section>
							<h2>{clip.speakers.length === 1 ? `Speaker` : `Speakers`}</h2>
							<Speakers data={clip.speakers} />
						</section>
					)}

					{clip.topics && (
						<section>
							<h2>{clip.topics.length === 1 ? `Topic` : `Topics`}</h2>
							<Topics topics={clip.topics} />
						</section>
					)}
				</div>
			</>
		);
	}
}

export const query = graphql`
	query($id: String!) {
		clip: airtable(id: { eq: $id }) {
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
						publishedDate(formatString: "YYYYMMDD")
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