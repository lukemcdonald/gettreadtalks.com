import React from 'react';

import { getRandomObjectItem } from '../../utilities';

import Products from './products';
import Product from './product';

export default function RandomProducts() {
	return (
		<Products>
			{(products) => {
				const data = getRandomObjectItem(products);
				return <Product data={data} disclosure />;
			}}
		</Products>
	);
}
