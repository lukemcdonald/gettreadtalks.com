import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Talk from './card';

export default function Talks({ talks, subtitle, hideAvatar }) {
	const posts = flattenObjectsByKey(talks, 'node');

	return (
		<div>
			{posts.map(({ id, fields, data }) => {
				const talk = { id, ...fields, ...data, subtitle, hideAvatar };
				return <Talk key={id} talk={talk} />;
			})}
		</div>
	);
}
