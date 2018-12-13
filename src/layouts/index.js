/* global tw */
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { GlobalStyles } from '../components/styled/global';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = ({ children }) => (
	<StaticQuery
		query={SITE_TITLE_QUERY}
		render={data => (
			<Page>
				<GlobalStyles />
				<Header siteTitle={data.site.siteMetadata.title} />
				<Main>{children}</Main>
				<Footer siteTitle={data.site.siteMetadata.title} />
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

export const Page = styled.div`
	${tw`app flex flex-col font-sans min-h-screen`};
`;

export const Main = styled.main`
	${tw`flex-grow`};
`;
