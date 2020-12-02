import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';

import { RefTagger } from './refTagger';
import Header from './header';
import Footer from './footer';

import styles from './layout.module.css';

const tailwind = require(`../../tailwind.config`);

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
						<RefTagger
							customStyle={{
								heading: {
									backgroundColor: tailwind.theme.colors.gray[800],
									color: tailwind.theme.colors.white,
								},
								body: {
									backgroundColor: tailwind.theme.colors.red[600],
									color: tailwind.theme.colors.gray[600],
								},
							}}
						/>
					</div>
				</>
			)}
		/>
	);
}
