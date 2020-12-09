import React from 'react';
import classnames from 'classnames';

import SingleSeries from './card';

export default function Series({ children, className, series }) {
	return (
		<div className={classnames('grid gap-4 sm:gap-6', className)}>
			{series.map(({ id, fields, data }) => {
				const singleSeries = { id, ...fields, ...data };
				return <SingleSeries key={id} series={singleSeries} />;
			})}
			{children}
		</div>
	);
}
