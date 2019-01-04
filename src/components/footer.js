import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentYear } from '../utils';
import { Container } from './styled/layout';
import { Footer, Copyright } from './styled/site';
import Affiliate from './affiliates/apple';

const SiteFooter = ({ siteTitle }) => (
	<Footer>
		<Container>
			<Affiliate />
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
