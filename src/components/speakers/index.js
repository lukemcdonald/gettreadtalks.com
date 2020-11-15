import React from 'react';
import { flattenObjectsByKey } from '../../utilities';

import Speaker from './card';

export default function Speakers({ children, className, size, speakers }) {
	const posts = flattenObjectsByKey(speakers, 'node');

	return (
		<div className={className}>
			{posts.map(({ id, fields, data }) => {
				const speaker = { id, ...fields, ...data };
				return <Speaker key={id} speaker={speaker} size={size} />;
			})}
			{children}
		</div>
	);
}
