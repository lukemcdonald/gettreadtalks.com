import React from 'react';

import { getRandomObjectItem } from '../../utilities';

import Products from './products';
import Product from './product';

export default function RandomProduct() {
	return (
		<Products>
			{(products) => {
				const data = getRandomObjectItem(products);
				return <Product data={data} disclosure />;
			}}
		</Products>
	);
}
