import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import striptags from 'striptags';

import { seoType, seoDefaults } from '../prop-types';
import { trimText } from '../utils';

function SEO(props) {
	const { description, image, keywords, lang, meta, pathname, title } = props;

	return (
		<StaticQuery
			query={detailsQuery}
			render={({ site: { siteMetadata } }) => {

				const seo = {
					description: trimText(
						striptags(description || siteMetadata.description),
						160
					),
					image: image || siteMetadata.siteUrl + siteMetadata.image,
					title: striptags(title || siteMetadata.title),
					url: `${siteMetadata.siteUrl}${pathname || '/'}`,
				};

				return (
					<Helmet
						htmlAttributes={{
							lang,
						}}
						title={seo.title}
						titleTemplate={siteMetadata.titleTemplate}
						meta={[
							{
								name: 'google-site-verification',
								content: 'dTbdp4VSVQmWmE5Zvgq2THjNtPdJrysZaC-0aGGlU0M',
							},
							{
								name: 'description',
								content: seo.description,
							},
							{
								property: 'og:title',
								content: seo.title,
							},
							{
								property: 'og:description',
								content: seo.description,
							},
							{
								property: 'og:type',
								content: 'website',
							},
							{
								property: 'og:image',
								content: seo.image,
							},
							{
								name: 'twitter:card',
								content: 'summary_large_image',
							},
							{
								name: 'twitter:creator',
								content: siteMetadata.twitterUsername,
							},
							{
								name: 'twitter:title',
								content: seo.title,
							},
							{
								name: 'twitter:description',
								content: seo.description,
							},
							{
								name: 'twitter:image',
								content: seo.image,
							},
						]
							.concat(
								keywords.length > 0
									? {
											name: 'keywords',
											content: keywords.join(', '),
									  }
									: []
							)
							.concat(meta)}
					/>
				);
			}}
		/>
	);
}

SEO.propTypes = seoType;
SEO.defaultProps = seoDefaults;

export default SEO;

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				description
				image
				siteUrl
				title
				titleTemplate
				twitterUsername
			}
		}
	}
`;
