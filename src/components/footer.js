import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentYear } from '../utils';
import { Container } from './styled/layout';
import { Footer } from './styled/site';

const SiteFooter = ({ siteTitle }) => (
	<Footer>
		<Container>
			<p>
				&copy; {siteTitle} {getCurrentYear()}
			</p>
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
