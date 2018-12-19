import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import striptags from 'striptags';

import { seoType, seoDefaults } from '../prop-types';

function SEO({ description, lang, meta, keywords, title }) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={data => {
				const metaDescription =
					description || data.site.siteMetadata.description;
				return (
					<Helmet
						htmlAttributes={{
							lang,
						}}
						title={striptags(title)}
						titleTemplate={`%s | ${data.site.siteMetadata.title}`}
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
								name: 'twitter:card',
								content: 'summary',
							},
							{
								name: 'twitter:creator',
								content: data.site.siteMetadata.author,
							},
							{
								name: 'twitter:title',
								content: striptags(title),
							},
							{
								name: 'twitter:description',
								content: striptags(metaDescription),
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
