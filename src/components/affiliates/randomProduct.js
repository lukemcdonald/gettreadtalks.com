import React from 'react';

import { getRandomObjectItem } from '../../utils';

import Products from './products';
import Product from './product';

export default () => (
	<Products>
		{products => {
			const data = getRandomObjectItem(products);
			return <Product data={data} />;
		}}
	</Products>
);
