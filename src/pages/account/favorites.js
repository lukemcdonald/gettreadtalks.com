// todo: Display five random featured talks as recomendations.
// todo: Display tabs for favorite talks, clips, speakers.
import { HeartIcon } from '@heroicons/react/outline'
import { graphql, navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'

import { Link } from '~/components/link'
import { AccountMenu } from '~/components/menus/account'
import { Page } from '~/components/page'
import { Section } from '~/components/section'
import { SEO } from '~/components/seo'
import { TalkList } from '~/components/talk'
import { useAuth } from '~/context/auth'
import { useUsers } from '~/context/users'

function AccountFavoritesPage({ data, location }) {
  const [favoriteTalks, setFavoriteTalks] = useState([])
  const { isUser } = useAuth()
  const { user } = useUsers()
  const { talks } = data

  useEffect(() => {
    if (!talks || !user?.favoriteTalks) return null

    // Get user favorites from all talks.
    const favorites = talks.nodes.filter(({ id }) => user.favoriteTalks.includes(id))

    // Update order of favorites to match order of user favorites.
    // The latest favorited talk should be shown first.
    let sortedFavorites = []
    user.favoriteTalks.map((id) => {
      const favoriteIndex = favorites.findIndex((fav) => fav.id === id)

      if (favorites[favoriteIndex].id === id) {
        sortedFavorites = [...sortedFavorites, favorites[favoriteIndex]]
      }

      return sortedFavorites
    })

    setFavoriteTalks(sortedFavorites)
  }, [talks, user])

  if (!isUser) {
    navigate('/login/')
    return null
  }

  return (
    <>
      <SEO title="Favorite Talks" location={location} />

      <Section>
        <Section.Sidebar>
          <AccountMenu />
        </Section.Sidebar>

        <Section.Content>
          {!Array.isArray(favoriteTalks) || !favoriteTalks.length ? (
            <Link
              to="/talks/"
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400"
            >
              <Page.Title>Favorites</Page.Title>
              <p className="mt-2">
                Click the {<HeartIcon className="inline h-6 w-6 text-gray-400" />} to save an item
                to your favorites list.
              </p>
            </Link>
          ) : (
            <div className="divide-y divide-gray-200">
              <Page.Title>Your favorite talks:</Page.Title>
              <div className="mt-5">
                <TalkList talks={favoriteTalks} />
              </div>
            </div>
          )}
        </Section.Content>
      </Section>
    </>
  )
}

export default AccountFavoritesPage

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
            data {
              title
              avatar {
                localFiles {
                  childImageSharp {
                    gatsbyImageData(width: 128, placeholder: TRACED_SVG, layout: CONSTRAINED)
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
