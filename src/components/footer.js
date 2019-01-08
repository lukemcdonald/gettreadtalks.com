/* global tw */
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentYear } from '../utils';
import { Container, Section } from './styled/layout';
import { Footer, Copyright } from './styled/site';
import RandomProduct from './affiliates/randomProduct';

const Affiliate = styled(Section)`
	${tw`mb-10`};
`;

const SiteFooter = ({ siteTitle }) => (
	<Footer>
		<Container>
			<Affiliate>
				<RandomProduct />
			</Affiliate>

			<Copyright>
				&copy; {siteTitle} {getCurrentYear()}
			</Copyright>
		</Container>
	</Footer>
);

SiteFooter.propTypes = {
	siteTitle: PropTypes.string,
};

SiteFooter.defaultProps = {
	siteTitle: '',
};

export default SiteFooter;
