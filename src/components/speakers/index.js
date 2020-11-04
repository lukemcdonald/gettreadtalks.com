import React from 'react';
import classnames from 'classnames';
import { flattenObjectsByKey } from '../../utilities';

import Speaker from './card';

export default function Speakers({ className, speakers }) {
	const posts = flattenObjectsByKey(speakers, 'node');

	return (
		<div className={classnames('', className)}>
			{posts.map(({ id, fields, data }) => {
				const speaker = { id, ...fields, ...data };
				return <Speaker key={id} speaker={speaker} />;
			})}
		</div>
	);
}
