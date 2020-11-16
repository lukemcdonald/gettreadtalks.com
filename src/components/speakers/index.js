import React from 'react';
import Speaker from './card';

export default function Speakers({ children, className, size, speakers }) {
	return (
		<div className={className}>
			{speakers.map(({ id, fields, data }) => {
				const speaker = { id, ...fields, ...data };
				return <Speaker key={id} speaker={speaker} size={size} />;
			})}
			{children}
		</div>
	);
}
