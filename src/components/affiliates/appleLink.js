import React from 'react';
import Link from '../link';
import { serializeObject } from '../../utils';
import badges from './badges';

export default ({ to, type, ...params }) => {
	let badge = badges.find(object => {
		return object.type === type;
	});

	const path = `https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?${serializeObject(
		{ ...badge, ...params }
	)}`;

	return (
		<Link
			to={to}
			style={{
				display: 'inline-block',
				overflow: 'hidden',
				background: `url(${path}) no-repeat`,
				width: `${badge.width}px`,
				height: `${badge.hight}px`,
			}}
		/>
	);
};
