import React from 'react';

import Clip from './card';

export default function Clips({ children, className, clips, disable }) {
	return (
		<div className={className}>
			{clips.map(({ id, fields, data }) => {
				const clip = { id, ...fields, ...data };
				return <Clip key={id} clip={clip} disable={disable} />;
			})}
			{children}
		</div>
	);
}
