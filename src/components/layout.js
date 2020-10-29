import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import RefTagger from './refTagger';

const SITE_META_QUERY = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;

export default function Layout({ children }) {
	return (
		<StaticQuery
			query={SITE_META_QUERY}
			render={(data) => (
				<div className="text-gray-800">
					<Header siteTitle={data.site.siteMetadata.title} />
					<main>
						<div className="container">{children}</div>
					</main>
					<Footer siteTitle={data.site.siteMetadata.title} />
					<RefTagger />
				</div>
			)}
		/>
	);
}
