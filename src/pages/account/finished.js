import React, { useEffect } from 'react'
import { navigate, graphql } from 'gatsby'

import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { AccountMenu } from 'components/menus/account'
import { useAuth } from 'context/auth'

function AccountFinishedPage({ location }) {
	const { isUser } = useAuth()

	useEffect(() => {
		if (!isUser) navigate('/login')
		return null
	})

	return (
		<>
			<SEO title="Finished Talks" location={location} />

			<Section>
				<Section.Sidebar>
					<AccountMenu />
				</Section.Sidebar>

				<Section.Content>
					<Page.Title>Finished Talks Page</Page.Title>
					<p>Display list of finished talks.</p>
				</Section.Content>
			</Section>
		</>
	)
}

export default AccountFinishedPage

export const query = graphql`
	query {
		talks: allAirtableTalk(
			filter: { data: { publishedDate: { ne: null } } }
			sort: { fields: data___publishedDate, order: DESC }
		) {
			totalCount
			nodes {
				id
				fields {
					slug
				}
				data {
					title
					favorite
					publishedDate(formatString: "YYYYMMDD")
					scripture
					speakers {
						id
						fields {
							slug
						}
						data {
							title
							avatar {
								localFiles {
									childImageSharp {
										gatsbyImageData(
											width: 128
											placeholder: TRACED_SVG
											layout: CONSTRAINED
										)
									}
								}
							}
						}
					}
				}
			}
		}
	}
`
