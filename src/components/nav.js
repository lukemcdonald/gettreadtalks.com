import React from 'react';

import Link from './link';

import FacebookIcon from '../assets/svgs/icon-facebook.svg';

const links = [
	{ label: 'About', path: '/about/' },
	{ label: 'Clips', path: '/clips/' },
	{ label: 'Series', path: '/series/' },
	{ label: 'Speakers', path: '/speakers/' },
	{ label: 'Talks', path: '/talks/' },
];

export default function Nav() {
	return (
		<div className="flex items-center space-x-6">
			{links.map((link) => (
				<Link
					key={link.label}
					to={link.path}
					className="text-lg font-medium hover:text-red-600"
					activeClassName="uppercase font-extrabold text-red-600 tracking-tight"
				>
					{link.label}
				</Link>
			))}

			<span className="inline-block h-5 border-l border-gray-400" />

			<Link
				className="block text-gray-700 hover:text-gray-900"
				to="https://www.facebook.com/gettreadtalks"
			>
				<FacebookIcon className="w-5 fill-current " />
			</Link>
		</div>
	);
}
