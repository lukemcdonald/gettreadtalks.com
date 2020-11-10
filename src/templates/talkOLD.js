import React, { Component } from 'react';
import { graphql } from 'gatsby';
import urlParser from 'js-video-url-parser';
import Link from '../components/link';
import { mapObjectToString, objectToString } from '../utilities';

import Intro from '../components/intro';
import SEO from '../components/seo';
import Speakers from '../components/speakers';
import Topics from '../components/topics';

export default class SinlgeTalkPage extends Component {
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
		const mediaLink = this.props.data.talk.data.link.childMarkdownRemark
			.rawMarkdownBody;
		return urlParser.parse(mediaLink);
	}

	async setParsedMedia() {
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
		const { data, location } = this.props;
		const { data: talk } = data.talk;

		const { html: mediaHtml, htmlAst: media } = talk.link.childMarkdownRemark;

		const mediaObject = media.children[0].children[0] || '';

		const meta = {
			title: talk.title,
			speakers: talk.speakers
				? `<em>by</em> ${talk.speakers
						.map(({ data: speaker }) => speaker.title)
						.join(', ')}`
				: null,
			scripture: talk.scripture ? `<em>from</em> ${talk.scripture}` : null,
			topics: talk.topics
				? `<em>on</em> ${talk.topics
						.map(({ data: topic }) => topic.title)
						.join(', ')}`
				: null,
		};

		return (
			<>
				<SEO
					title={mapObjectToString(['title', 'speakers'], meta)}
					description={objectToString(meta)}
					image={mediaUrl}
					location={location}
				/>

				<Intro
					title={talk.title}
					excerpt={mapObjectToString(['speakers', 'scripture'], meta)}
				>
					{mediaObject.tagName === 'iframe' && (
						<div
							className="responsive-media"
							dangerouslySetInnerHTML={{
								__html: mediaHtml,
							}}
						/>
					)}

					{mediaObject.tagName === 'a' && (
						<p>
							<Link to={mediaObject.properties.href}>
								Listen to Talk &rarr;
							</Link>
						</p>
					)}
				</Intro>

				<section>
					{talk.speakers && (
						<div>
							<h2>{talk.speakers.length === 1 ? `Speaker` : `Speakers`}</h2>
							<Speakers data={talk.speakers} />
						</div>
					)}
				</section>

				<section>
					{talk.topics && (
						<div>
							<h2>{talk.topics.length === 1 ? `Topic` : `Topics`}</h2>
							<Topics topics={talk.topics} />
						</div>
					)}
				</section>
			</>
		);
	}
}

export const query = graphql`
	query($id: String!) {
		talk: airtableTalk(id: { eq: $id }) {
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
