import React from 'react';
import Img from 'gatsby-image';

import Images from './images';
import Link from './link';

const links = [
	{ label: 'About', path: '/about/' },
	{ label: 'Clips', path: '/clips/' },
	{ label: 'Series', path: '/series/' },
	{ label: 'Speakers', path: '/speakers/' },
	{ label: 'Talks', path: '/talks/' },
	{ label: 'Topics', path: '/topics/' },
];

export default function Nav() {
	return (
		<div className="flex items-center gap-4">
			{links.map((link) => (
				<Link
					key={link.label}
					to={link.path}
					className="text-lg font-normal"
					activeClassName="uppercase font-extrabold text-red-600 tracking-tight"
				>
					{link.label}
				</Link>
			))}

			<Link
				className="inline-block pl-4 border-l border-gray-400"
				href="https://www.facebook.com/gettreadtalks"
			>
				<Images>
					{(images) => (
						<Img
							className="w-6"
							alt="Facebook Logo"
							fluid={images['facebook-icon'].fluid}
						/>
					)}
				</Images>
			</Link>
		</div>
	);
}
