import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import striptags from 'striptags';

import image from '../assets/images/meta-tags-image.jpg';

import { seoType, seoDefaults } from '../prop-types';

function SEO({ description, lang, meta, keywords, title }) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={data => {
				const { siteMetadata } = data.site;
				const metaDescription = description || siteMetadata.description;
				const metaImage = image || siteMetadata.image;

				return (
					<Helmet
						htmlAttributes={{
							lang,
						}}
						title={striptags(title)}
						titleTemplate={`%s | ${siteMetadata.title}`}
						meta={[
							{
								name: 'description',
								content: striptags(metaDescription),
							},
							{
								property: 'og:title',
								content: striptags(title),
							},
							{
								property: 'og:description',
								content: striptags(metaDescription),
							},
							{
								property: 'og:type',
								content: 'website',
							},
							{
								property: 'og:image',
								content: metaImage,
							},
							{
								name: 'twitter:card',
								content: 'summary',
							},
							{
								name: 'twitter:creator',
								content: siteMetadata.author,
							},
							{
								name: 'twitter:title',
								content: striptags(title),
							},
							{
								name: 'twitter:description',
								content: striptags(metaDescription),
							},
							{
								name: 'twitter:image',
								content: metaImage,
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
				title
				description
				author
			}
		}
	}
`;
