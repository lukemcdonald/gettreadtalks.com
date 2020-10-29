import React from 'react';
import { Link } from 'gatsby';
import Logo from './logo';
import SiteNav from './nav';

export default function SiteHeader({ siteTitle }) {
	return (
		<header className="border-t-4 border-red-600 bg-gradient-to-b from-gray-50">
			<div className="p-10 text-black">
				<nav className="flex items-center justify-between ">
					<h1>
						<Link to="/" className="">
							<Logo className="inline-block h-8 fill-current" />
							<span className="sr-only">{siteTitle}</span>
						</Link>
					</h1>
					<SiteNav />
				</nav>
			</div>
		</header>
	);
}
