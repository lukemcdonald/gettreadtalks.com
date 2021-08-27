// todo: Add a proper footer section with links to paegs: summary of essential beliefs, testimonials, scriptures, technology/uses, affiliate links, social media, newsletter signup, etc.

// todo: Make sticky footer for pages with little content.

import React from 'react'
import { Section } from 'components/section'

function SiteFooter({ siteTitle }) {
	const year = new Date().getFullYear()
	const copyright = `© ${siteTitle} ${year}`
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
	)
}

export { SiteFooter }
