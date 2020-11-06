import React from 'react';
import Section, { Content } from './section';

import { getCurrentYear } from '../utilities';
import RandomProducts from './affiliates/randomProduct';

export default function SiteFooter({ siteTitle }) {
	return (
		<Section type="footer" className="bg-gradient-to-t from-white">
			<Content>
				<RandomProducts />

				<p className="mt-8 text-center text-gray-500">
					&copy; {siteTitle} {getCurrentYear()}
				</p>
			</Content>
		</Section>
	);
}
