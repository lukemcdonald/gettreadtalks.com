import React from 'react';
import { Link } from 'gatsby';
import Logo from './logo';
import SiteNav from './nav';

export default function SiteHeader({ siteTitle }) {
	return (
		<header>
			<div>
				<nav>
					<h1>
						<Link to="/">
							<Logo />
							<span className="visuallyhidden">{siteTitle}</span>
						</Link>
					</h1>
					<SiteNav />
				</nav>
			</div>
		</header>
	);
}
