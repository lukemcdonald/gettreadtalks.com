import React from 'react';
import { flattenObjectsByKey } from '../../utilities';

import Clip from './card';

export default function Clips({ clips }) {
	const posts = flattenObjectsByKey(clips, 'node');

	return (
		<div>
			{posts.map(({ id, fields, data }) => {
				const clip = { id, ...fields, ...data };
				return <Clip key={id} clip={clip} />;
			})}
		</div>
	);
}
