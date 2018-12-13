import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { Container } from './styled/layout';
import { SiteHeader, SiteBranding, SiteTitle, SiteLogo } from './styled/site';
import SiteNav from './nav';

const Header = ({ siteTitle }) => (
	<SiteHeader>
		<Container>
			<SiteBranding>
				<SiteTitle>
					<Link to="/">
						<SiteLogo />
						<span className="visuallyhidden">{siteTitle}</span>
					</Link>
				</SiteTitle>
				<SiteNav />
			</SiteBranding>
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
