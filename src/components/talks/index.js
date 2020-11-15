import React from 'react';
import { flattenObjectsByKey } from '../../utilities';

import Talk from './card';

export default function Talks({
	children,
	className,
	hideAvatar,
	subtitle,
	talks,
}) {
	const posts = flattenObjectsByKey(talks, 'node');

	return (
		<div className={className}>
			{posts.map(({ id, fields, data }) => {
				const talk = { id, ...fields, ...data, hideAvatar, subtitle };
				return <Talk key={id} talk={talk} />;
			})}
			{children}
		</div>
	);
}
