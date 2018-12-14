import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { GlobalStyles } from '../components/styled/global';
import { Page, Main } from '../components/styled/layout';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ children, header, main, footer }) => (
	<StaticQuery
		query={SITE_TITLE_QUERY}
		render={data => (
			<Page>
				<GlobalStyles />
				<Header {...main} siteTitle={data.site.siteMetadata.title} />
				<Main {...main}>{children}</Main>
				<Footer {...main} siteTitle={data.site.siteMetadata.title} />
			</Page>
		)}
	/>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

export const SITE_TITLE_QUERY = graphql`
	query SITE_TITLE_QUERY {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
