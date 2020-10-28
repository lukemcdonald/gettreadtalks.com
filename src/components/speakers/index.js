import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Speaker from './card';

export default function Speakers({ speakers }) {
	const posts = flattenObjectsByKey(speakers, 'node');

	return (
		<div>
			{posts.map(({ id, fields, data }) => {
				const speaker = { id, ...fields, ...data };
				return <Speaker key={id} speaker={speaker} />;
			})}
		</div>
	);
}
