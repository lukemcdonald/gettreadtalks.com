/* global tw */
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentYear } from '../utils';
import { Container as ContainerStyle } from './styled/layout';

const Container = styled(ContainerStyle)`
	${tw`py-10`}
`;

const Footer = ({ siteTitle }) => (
	<footer>
		<Container>
			<p>
				&copy; {siteTitle} {getCurrentYear()}
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
