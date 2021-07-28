import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { SiteHeader } from './siteHeader'
import { SiteFooter } from './siteFooter'

const SITE_META_QUERY = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`

function Layout({ children }) {
	return (
		<StaticQuery
			query={SITE_META_QUERY}
			render={(data) => (
				<>
					<div className="fixed inset-0 z-0 bg-gray-200 bg-cover bg-image-swirl" />

					<div className="relative text-gray-700">
						<SiteHeader siteTitle={data.site.siteMetadata.title} />
						<main className="relative z-0">{children}</main>
						<SiteFooter siteTitle={data.site.siteMetadata.title} />
					</div>
				</>
			)}
		/>
	)
}

export { Layout }
