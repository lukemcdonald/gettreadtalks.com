import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';

import Header from './header';
import Footer from './footer';

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
				<>
					<div className="fixed inset-0 z-0 bg-gray-200 bg-cover bg-image-swirl" />

					<div className="relative text-gray-700">
						<Header siteTitle={data.site.siteMetadata.title} />
						<main className="relative z-0">{children}</main>
						<Footer siteTitle={data.site.siteMetadata.title} />
					</div>
				</>
			)}
		/>
	);
}
