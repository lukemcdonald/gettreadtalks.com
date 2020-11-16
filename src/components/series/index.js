import React from 'react';
import SingleSeries from './card';

export default function Series({ children, className, series }) {
	return (
		<div className={className}>
			{series.map(({ id, fields, data }) => {
				const singleSeries = { id, ...fields, ...data };
				return <SingleSeries key={id} series={singleSeries} />;
			})}
			{children}
		</div>
	);
}
