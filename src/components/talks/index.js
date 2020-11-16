import React from 'react';
import Talk from './card';

export default function Talks({
	children,
	className,
	hideAvatar,
	subtitle,
	talks,
}) {
	return (
		<div className={className}>
			{talks.map(({ id, fields, data }) => {
				const talk = { id, ...fields, ...data, hideAvatar, subtitle };
				return <Talk key={id} talk={talk} />;
			})}
			{children}
		</div>
	);
}
