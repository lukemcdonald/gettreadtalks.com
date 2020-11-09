import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import striptags from 'striptags';

import { trimText } from '../utilities';

const seoQuery = graphql`
	query {
		site {
			siteMetadata {
				description
				image
				siteUrl
				title
				twitterUsername
			}
		}
	}
`;

export default function SEO({ children, location, title, description, image }) {
	return (
		<StaticQuery
			query={seoQuery}
			render={({ site: { siteMetadata } }) => {
				const seo = {
					description: trimText(
						striptags(description || siteMetadata.description),
						160
					),
					image: image || '/logo.svg',
					title: striptags(title || siteMetadata.title),
					url: `${siteMetadata.siteUrl}${pathname || '/'}`,
				};

				return (
					<Helment
						htmlAttributes={{ lang: 'en' }}
						titleTemplate={`%s — ${siteMetadata.title}`}
					>
						<title>{seo.title}</title>
						{/* Fav Icons */}
						<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
						<link
							rel="alternate icon"
							type="image/svg+xml"
							href="/favicon.svg"
						/>
						{/* Google Verification */}
						<meta
							name="google-site-verification"
							content="dTbdp4VSVQmWmE5Zvgq2THjNtPdJrysZaC-0aGGlU0M"
						/>
						{/* Open Graph */}
						{location && <meta property="og:url" content={location.href} />}
						<meta property="og:image" content={seo.image} />
						<meta property="og:title" content={seo.title} key="ogtitle" />
						<meta
							property="og:site_name"
							content={site.siteMetadata.title}
							key="ogsitename"
						/>
						<meta
							property="og:description"
							content={seo.description}
							key="ogdesc"
						/>
						{/* Twitter */}
						<meta name="twitter:card" content="summary_large_image" />
						<meta property="og:image" content={seo.image} />
						<meta name="og:title" content={seo.title} />
						<meta name="og:description" content={seo.description} />
						<meta
							name="twitter:creator"
							content={site.siteMetadata.twitterUsername}
						/>
						{/* Additions and Overrides */}
						{children}
					</Helment>
				);
			}}
		/>
	);
}
