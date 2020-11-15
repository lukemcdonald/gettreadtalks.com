import React from 'react';
import { flattenObjectsByKey } from '../../utilities';

import SingleSeries from './card';

export default function Series({ children, className, series }) {
	const posts = flattenObjectsByKey(series, 'node');

	return (
		<div className={className}>
			{posts.map(({ id, fields, data }) => {
				const singleSeries = { id, ...fields, ...data };
				return <SingleSeries key={id} series={singleSeries} />;
			})}
			{children}
		</div>
	);
}
