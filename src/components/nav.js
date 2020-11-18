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
		<div className="flex items-center">
			{links.map((link) => (
				<Link
					key={link.label}
					to={link.path}
					className="mr-6 text-lg font-medium hover:text-red-600"
					activeClassName="uppercase font-extrabold text-red-600 tracking-tight"
				>
					{link.label}
				</Link>
			))}

			<Link
				className="inline-block pl-6 text-gray-700 border-l border-gray-400 hover:text-blue-600"
				href="https://www.facebook.com/gettreadtalks"
			>
				<FacebookIcon className="w-5 fill-current" />
			</Link>
		</div>
	);
}
