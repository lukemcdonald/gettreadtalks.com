import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { GlobalStyles } from './styled/global';
import { Page, Main } from './styled/layout';
import Header from './header';
import Footer from './footer';
import RefTagger from './refTagger';

const Layout = ({ children, header, main, footer }) => (
	<StaticQuery
		query={SITE_TITLE_QUERY}
		render={data => (
			<Page>
				<GlobalStyles />
				<Header {...main} siteTitle={data.site.siteMetadata.title} />
				<Main {...main}>{children}</Main>
				<Footer {...main} siteTitle={data.site.siteMetadata.title} />
				<RefTagger />
			</Page>
		)}
	/>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

const SITE_TITLE_QUERY = graphql`
	query SITE_TITLE_QUERY {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
