import React from 'react';
import Talk from './card';

export default function Talks({
	children,
	className,
	disable,
	subtitle,
	talks,
}) {
	return (
		<div className={className}>
			{talks.map(({ id, fields, data }) => {
				const talk = { id, ...fields, ...data, subtitle };
				return <Talk key={id} talk={talk} disable={disable} />;
			})}
			{children}
		</div>
	);
}
