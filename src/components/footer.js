/* global tw */
import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

const Container = styled('section')`
	${tw`container py-10 px-4 mx-auto`}
`;

const Footer = ({ siteTitle }) => (
	<footer>
		<Container>
			<p>
				©{siteTitle} {new Date().getFullYear()}
			</p>
		</Container>
	</footer>
);

Footer.propTypes = {
	siteTitle: PropTypes.string,
};

Footer.defaultProps = {
	siteTitle: '',
};

export default Footer;
