import React from 'react';
import Section, { Content, Sidebar } from './section';

import { getCurrentYear } from '../utilities';
import RandomProduct from './affiliates/randomProduct';

export default function SiteFooter({ siteTitle }) {
	const year = getCurrentYear();
	const copyright = `© ${siteTitle} ${year}`;
	return (
		<Section as="footer" className="bg-gradient-to-t from-white">
			<Sidebar className="lg:hidden">
				<p className="text-gray-500">{copyright}</p>
			</Sidebar>
			<Content>
				<RandomProduct />
				<p className="hidden mt-8 text-center text-gray-500 lg:block">
					{copyright}
				</p>
			</Content>
		</Section>
	);
}
