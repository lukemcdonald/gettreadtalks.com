/* global tw */
import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Logo from './logo';
import Nav from './nav';

const SiteHeader = styled('header')`
	${tw`bg-white clearfix border-t-4 pt-1 border-brand`};
`;

const Container = styled('div')`
	${tw`container px-4 mx-auto`};
`;

const NavBar = styled('nav')`
	${tw`block my-4 md:flex`};
`;

const SiteTitle = styled('h1')`
	${tw`flex justify-center items-center md:justify-start md:w-1/2`};
`;

const SiteLogo = styled(Logo)`
	${tw`h-8`};
`;

const Header = ({ siteTitle }) => (
	<SiteHeader>
		<Container>
			<NavBar>
				<SiteTitle>
					<Link to="/">
						<SiteLogo />
						<span className="visuallyhidden">{siteTitle}</span>
					</Link>
				</SiteTitle>
				<Nav />
			</NavBar>
		</Container>
	</SiteHeader>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: '',
};

export default Header;
