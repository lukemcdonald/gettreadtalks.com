import React from 'react'

import { getRandomObjectItem } from '../../utilities'

import Products from './products'
import Product from './product'

export default function RandomProduct({ card, className, disclosure, size }) {
	return (
		<Products>
			{(products) => {
				const data = getRandomObjectItem(products)

				return (
					<Product
						className={className}
						card={card}
						data={data}
						disclosure={disclosure}
						size={size}
					/>
				)
			}}
		</Products>
	)
}
