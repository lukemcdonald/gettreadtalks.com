import React from 'react';
import Section, { Content } from './section';

import { getCurrentYear } from '../utilities';
import RandomProduct from './affiliates/randomProduct';

export default function SiteFooter({ siteTitle }) {
	return (
		<Section as="footer" className="bg-gradient-to-t from-white">
			<Content>
				<RandomProduct />

				<p className="mt-8 text-center text-gray-500">
					&copy; {siteTitle} {getCurrentYear()}
				</p>
			</Content>
		</Section>
	);
}
