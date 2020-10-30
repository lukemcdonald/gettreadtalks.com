import React from 'react';

import { getCurrentYear } from '../utils';

export default function SiteFooter({ siteTitle }) {
	return (
		<footer className="pb-12 bg-gradient-to-t from-white">
			<div className="container">
				<section className="m-auto mt-8 max-w-65ch">
					<p className="text-center">
						&copy; {siteTitle} {getCurrentYear()}
					</p>
				</section>
			</div>
		</footer>
	);
}
