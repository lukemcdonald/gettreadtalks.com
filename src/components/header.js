import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { Container } from './styled/layout';
import { Header, Branding, Title, Logo } from './styled/site';
import SiteNav from './nav';

const SiteHeader = ({ siteTitle }) => (
	<Header>
		<Container>
			<Branding>
				<Title>
					<Link to="/">
						<Logo />
						<span className="visuallyhidden">{siteTitle}</span>
					</Link>
				</Title>
				<SiteNav />
			</Branding>
		</Container>
	</Header>
);

SiteHeader.propTypes = {
	siteTitle: PropTypes.string,
};

SiteHeader.defaultProps = {
	siteTitle: '',
};

export default SiteHeader;
