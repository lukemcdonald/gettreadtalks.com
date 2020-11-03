import React from 'react';
import { flattenObjectsByKey } from '../../utilities';

import Topic from './card';

export default function Topics({ topics }) {
	const posts = flattenObjectsByKey(topics, 'node');

	return (
		<div>
			{posts.map(({ id, fields, data }) => {
				const topic = { id, ...fields, ...data };
				return <Topic key={id} topic={topic} />;
			})}
		</div>
	);
}
