import React from 'react';

import { getCurrentYear } from '../utils';
import RandomProduct from './affiliates/randomProduct';

export default function SiteFooter({ siteTitle }) {
	return (
		<footer className="bg-gradient-to-t from-white">
			<div className="container py-12 max-w-65ch">
				<section>
					<RandomProduct />
				</section>

				<section>
					<p className="mt-6 text-center">
						&copy; {siteTitle} {getCurrentYear()}
					</p>
				</section>
			</div>
		</footer>
	);
}
