import React from 'react';
import Topic from './card';

export default function Topics({ className, topics }) {
	return (
		<div className={className}>
			{topics.map(({ id, fields, data }) => {
				const topic = { id, ...fields, ...data };
				return <Topic key={id} topic={topic} />;
			})}
		</div>
	);
}
