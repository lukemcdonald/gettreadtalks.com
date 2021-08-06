import React from 'react'
import { graphql } from 'gatsby'

import { useAffiliateLinks } from 'hooks/useAffiliateLinks'

import { SEO } from 'components/seo'
import { Section } from 'components/section'
import { AffiliateLinkCard } from 'components/affiliates/card'
import { Page } from 'components/page'

function SinglePage({ data, location }) {
	const { data: page } = data.page
	const { randomLink } = useAffiliateLinks()

	return (
		<>
			<SEO
				title={page.title}
				description={page.content.childMarkdownRemark.excerpt}
				location={location}
			/>

			<Section>
				<Section.Content as="article">
					<div className="prose">
						<Page.Title>{page.title}</Page.Title>
						<div
							className="prose prose-lg"
							dangerouslySetInnerHTML={{
								__html: page.content.childMarkdownRemark.html,
							}}
						/>
					</div>

					<div className="mt-10">
						<AffiliateLinkCard data={randomLink} className="rounded" />
					</div>
				</Section.Content>
			</Section>
		</>
	)
}

export default SinglePage

export const query = graphql`
	query ($id: String!) {
		page: airtablePage(id: { eq: $id }) {
			id
			fields {
				slug
			}
			data {
				title
				path
				content {
					childMarkdownRemark {
						excerpt
						html
					}
				}
			}
		}
	}
`
