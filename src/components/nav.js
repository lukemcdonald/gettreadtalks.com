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
		<div className="flex gap-4">
			{links.map((link) => (
				<Link key={link.label} to={link.path} activeClassName="is-active">
					{link.label}
				</Link>
			))}

			<Link
				className="inline-block w-6"
				href="https://www.facebook.com/gettreadtalks"
			>
				<Images>
					{(images) => (
						<Img alt="Facebook Logo" fluid={images['facebook-icon'].fluid} />
					)}
				</Images>
			</Link>
		</div>
	);
}
