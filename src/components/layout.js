import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';
import styles from './layout.module.css';

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
				<>
					<div
						className={classnames(
							'fixed inset-0 bg-cover bg-gray-200 z-0',
							styles.svgBg
						)}
					/>
					<div className="relative text-gray-700">
						<Header siteTitle={data.site.siteMetadata.title} />
						<main>{children}</main>
						<Footer siteTitle={data.site.siteMetadata.title} />
						<RefTagger />
					</div>
				</>
			)}
		/>
	);
}
