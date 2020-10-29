import React from 'react';
import { Link } from 'gatsby';
import Logo from './logo';
import SiteNav from './nav';

export default function SiteHeader({ siteTitle }) {
	return (
		<header>
			<div className="container py-10">
				<nav className="flex justify-between items-center">
					<h1>
						<Link to="/">
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
