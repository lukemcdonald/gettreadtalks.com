import React from 'react';
import classnames from 'classnames';
import { flattenObjectsByKey } from '../../utilities';

import Clip from './card';

export default function Clips({ children, className, clips }) {
	const posts = flattenObjectsByKey(clips, 'node');

	return (
		<div className={className}>
			{posts.map(({ id, fields, data }) => {
				const clip = { id, ...fields, ...data };
				return <Clip key={id} clip={clip} />;
			})}
			{children}
		</div>
	);
}
