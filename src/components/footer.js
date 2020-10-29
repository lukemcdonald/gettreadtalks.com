import React from 'react';

import { getCurrentYear } from '../utils';
import RandomProduct from './affiliates/randomProduct';

export default function SiteFooter({ siteTitle }) {
	return (
		<footer>
			<div className="container py-10">
				<section>
					<RandomProduct />
				</section>

				<div>
					&copy; {siteTitle} {getCurrentYear()}
				</div>
			</div>
		</footer>
	);
}
