/* global tw */
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

import { getRandomObjectItem } from '../utils';

import { getCurrentYear } from '../utils';
import { Container, Section } from './styled/layout';
import { Footer, Copyright } from './styled/site';

import Products from '../components/affiliates/products';
import Product from '../components/affiliates/product';

const Affiliate = styled(Section)`
	${tw`mb-10`};
`;

const SiteFooter = ({ siteTitle }) => (
	<Footer>
		<Container>
			<Affiliate>
				<Products>
					{products => <Product data={getRandomObjectItem(products)} />}
				</Products>
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
