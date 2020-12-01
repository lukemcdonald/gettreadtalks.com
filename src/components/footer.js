import React from 'react';
import Section from './section';

import { getCurrentYear } from '../utilities';

export default function SiteFooter({ siteTitle }) {
	const year = getCurrentYear();
	const copyright = `© ${siteTitle} ${year}`;
	return (
		<Section as="footer" className="bg-gradient-to-t from-white">
			<Section.Sidebar className="lg:hidden">
				<p className="text-gray-500">{copyright}</p>
			</Section.Sidebar>

			<Section.Content>
				<p className="hidden mt-8 text-center text-gray-500 lg:block">
					{copyright}
				</p>
			</Section.Content>
		</Section>
	);
}
