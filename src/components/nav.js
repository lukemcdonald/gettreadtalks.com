import React from 'react';
import classnames from 'classnames';

import Link from './link';

import styles from './nav.module.css';
import FacebookIcon from '../assets/svgs/icon-facebook.svg';

const links = [
	{ label: 'About', path: '/about/' },
	{ label: 'Clips', path: '/clips/' },
	{ label: 'Series', path: '/series/' },
	{ label: 'Speakers', path: '/speakers/' },
	{ label: 'Talks', path: '/talks/' },
];

export default function Nav({ className }) {
	return (
		<nav className={classnames(styles.nav, className)}>
			<input type="checkbox" id="menu-toggle-checkbox" className="hidden" />

			<label
				htmlFor="menu-toggle-checkbox"
				className="cursor-pointer md:hidden"
			>
				<svg
					className="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 8h16M4 16h16"
					/>
				</svg>
			</label>

			<div
				className={classnames(
					'absolute left-0 w-full overflow-hidden max-h-0 top-full z-50',
					'md:max-h-full md:overflow-visible md:static md:w-auto '
				)}
			>
				<ul
					className={classnames(
						'bg-white shadow-lg mx-4 rounded divide-y',
						'md:flex md:items-center md:space-x-6 md:bg-transparent md:shadow-none md:divide-none'
					)}
				>
					{links.map((link) => (
						<li key={link.label}>
							<Link
								to={link.path}
								className="block px-4 py-2 text-lg font-medium md:inline-block md:py-0 md:px-0 hover:text-red-600"
								activeClassName="uppercase font-extrabold text-red-600 tracking-tight"
							>
								{link.label}
							</Link>
						</li>
					))}

					<span className="hidden h-5 border-l border-gray-400 md:inline-block" />

					<li>
						<Link
							className="block px-4 py-3 text-gray-700 hover:text-gray-900 md:py-0 md:px-0"
							to="https://www.facebook.com/gettreadtalks"
						>
							<FacebookIcon className="w-5 fill-current " />
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
