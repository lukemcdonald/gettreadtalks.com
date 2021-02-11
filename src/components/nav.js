import React, { useState } from 'react';
import classnames from 'classnames';
import { RiFacebookBoxFill as Facebook } from 'react-icons/ri';
import { HiMenuAlt4 as Menu, HiMail as Mail } from 'react-icons/hi';
import { TiRss as RSS } from 'react-icons/ti';

import Link from './link';
import styles from './nav.module.css';

const links = [
	{ label: 'About', path: '/about/' },
	{ label: 'Clips', path: '/clips/' },
	{ label: 'Series', path: '/series/' },
	{ label: 'Speakers', path: '/speakers/' },
	{ label: 'Talks', path: '/talks/' },
];

export default function Nav({ className }) {
	const [checked, setChecked] = useState(false);
	const handleClick = () => setChecked(!checked);

	return (
		<nav className={classnames(styles.nav, className)}>
			<input
				id="menu-toggle-checkbox"
				type="checkbox"
				className="hidden"
				checked={checked}
				readOnly
			/>

			<label
				htmlFor="menu-toggle-checkbox"
				className="flex items-center leading-none tracking-wide cursor-pointer md:hidden"
				onClick={handleClick}
			>
				<Menu className="w-6 h-6" />{' '}
				<span className="inline-block ml-1 text-sm font-bold uppercase">
					Menu
				</span>
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
						'md:flex md:items-center md:space-x-6 md:bg-transparent md:shadow-none md:divide-y-0'
					)}
				>
					{links.map((link) => (
						<li key={link.label}>
							<Link
								to={link.path}
								className="block px-4 py-2 text-lg font-medium md:inline-block md:py-0 md:px-0 hover:text-red-600"
								activeClassName="uppercase font-extrabold text-red-600 tracking-tight"
								onClick={handleClick}
							>
								{link.label}
							</Link>
						</li>
					))}

					<li className="hidden h-5 border-l border-gray-300 md:inline-block" />

					<li>
						<Link
							className="block px-4 py-3 text-gray-700 hover:text-gray-900 md:px-0 md:py-0"
							to="https://www.facebook.com/gettreadtalks"
							onClick={handleClick}
							title="Facebook"
						>
							<Facebook className="w-6 h-6" />
						</Link>
					</li>
					<li>
						<Link
							className="block px-4 py-3 text-gray-700 hover:text-gray-900 md:px-0 md:py-0"
							to="https://treadtalks.ck.page/"
							onClick={handleClick}
							title="Email Subscribe"
						>
							<Mail className="w-6 h-6" />
						</Link>
					</li>

					<li>
						<Link
							className="block px-4 py-3 text-gray-700 hover:text-gray-900 md:px-0 md:py-0"
							to="https://gettreadtalks.com/rss.xml"
							onClick={handleClick}
							title="RSS Feed"
						>
							<RSS className="w-6 h-6" />
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
