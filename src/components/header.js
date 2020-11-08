import React from 'react';
import { Link } from 'gatsby';
import Logo from './logo';
import SiteNav from './nav';

export default function SiteHeader({ siteTitle }) {
	return (
		<header className="px-4 border-t-4 border-red-600 bg-gradient-to-b from-gray-50 sm:px-6">
			<div className="max-w-screen-xl py-10 m-auto">
				<nav className="flex items-center justify-between text-gray-900">
					<h1>
						<Link to="/" className="block">
							<Logo className="inline-block h-8 " />
							<span className="sr-only">{siteTitle}</span>
						</Link>
					</h1>
					<SiteNav />
				</nav>
			</div>
		</header>
	);
}
