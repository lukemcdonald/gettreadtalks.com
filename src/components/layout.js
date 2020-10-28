import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import RefTagger from './refTagger';

const SITE_TITLE_QUERY = graphql`
	query SITE_TITLE_QUERY {
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
			query={SITE_TITLE_QUERY}
			render={(data) => (
				<div>
					<Header siteTitle={data.site.siteMetadata.title} />
					<main>{children}</main>
					<Footer siteTitle={data.site.siteMetadata.title} />
					<RefTagger />
				</div>
			)}
		/>
	);
}
