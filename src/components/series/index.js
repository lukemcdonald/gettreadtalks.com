import React from 'react';
import { flattenObjectsByKey } from '../../utilities';

import SingleSeries from './card';

export default function Series({ series }) {
	const posts = flattenObjectsByKey(series, 'node');

	return (
		<div>
			{posts.map(({ id, fields, data }) => {
				const singleSeries = { id, ...fields, ...data };
				return <SingleSeries key={id} series={singleSeries} />;
			})}
		</div>
	);
}
