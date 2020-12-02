import React from 'react';
import Speaker from './card';

export default function Speakers({ children, className, disable, speakers }) {
	return (
		<div className={className}>
			{children}
			{speakers.map(({ id, fields, data }) => {
				const speaker = { id, ...fields, ...data };
				return <Speaker key={id} speaker={speaker} disable={disable} />;
			})}
		</div>
	);
}
