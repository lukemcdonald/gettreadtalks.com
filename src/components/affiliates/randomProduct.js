import React from 'react'

import { Products } from 'components/affiliates/products'
import { Product } from 'components/affiliates/product'
import { getRandomObjectItem } from 'utils/misc'

function RandomProduct({ card, className, disclosure, size }) {
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

export { RandomProduct }
