import React from 'react';
import classnames from 'classnames';
import { flattenObjectsByKey } from '../../utilities';

import Topic from './card';

export default function Topics({ className, topics }) {
	const posts = flattenObjectsByKey(topics, 'node');

	return (
		<div className={classnames('', className)}>
			{posts.map(({ id, fields, data }) => {
				const topic = { id, ...fields, ...data };
				return <Topic key={id} topic={topic} />;
			})}
		</div>
	);
}
