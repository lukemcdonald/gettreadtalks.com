import React from 'react';
import { Link } from 'gatsby';
import Logo from './svgs/logo';
import SiteNav from './nav';

export default function SiteHeader({ siteTitle }) {
	return (
		<header className="relative z-50 border-t-4 border-red-600 bg-gradient-to-b from-gray-50">
			<div className="container max-w-screen-xl py-6 md:py-10">
				<div className="flex items-center justify-between text-gray-900">
					<h1>
						<Link to="/" className="block">
							<Logo className="inline-block h-6 sm:h-8" />
							<span className="sr-only">{siteTitle}</span>
						</Link>
					</h1>

					<SiteNav />
				</div>
			</div>
		</header>
	);
}
