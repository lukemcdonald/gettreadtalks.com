import React from 'react';
import classnames from 'classnames';
import { flattenObjectsByKey } from '../../utilities';

import Talk from './card';

export default function Talks({ className, hideAvatar, subtitle, talks }) {
	const posts = flattenObjectsByKey(talks, 'node');

	return (
		<div className={classnames('', className)}>
			{posts.map(({ id, fields, data }) => {
				const talk = { id, ...fields, ...data, hideAvatar, subtitle };
				console.log(talk);
				return <Talk key={id} talk={talk} />;
			})}
		</div>
	);
}
