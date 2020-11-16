import React from 'react';

import Clip from './card';

export default function Clips({ children, className, clips }) {
	console.log(clips);

	return (
		<div className={className}>
			{clips.map(({ id, fields, data }) => {
				const clip = { id, ...fields, ...data };
				return <Clip key={id} clip={clip} />;
			})}
			{children}
		</div>
	);
}
