// todo: Display five random featured talks as recomendations.
// todo: Display tabs for favorite talks, clips, speakers.
import { useMemo } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql, navigate } from 'gatsby'
import { HeartIcon } from '@heroicons/react/24/outline'

import { AccountMenu } from '~/components/account-menu'
import { Link } from '~/components/link'
import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { TalkList } from '~/components/talk'
import { useAuth } from '~/context/auth'
import { useUsers } from '~/context/users'

type Props = PageProps<Queries.AccountFavoritesPageQuery>

function AccountFavoritesPage({ data }: Props) {
  const { isUser } = useAuth()
  const { user } = useUsers()
  const { talks } = data
  const userFavoriteTalks = user?.favoriteTalks
  const favoriteTalks = useMemo(() => {
    if (userFavoriteTalks) {
      // Get favorite user talks.
      const favorites = talks.nodes.filter(({ id }) => userFavoriteTalks.includes(id))
      // Update favorite talks to match order of user favorites; latest favorited talk shown first.
      return favorites
        .slice()
        .sort((a, b) => userFavoriteTalks.indexOf(a?.id) - userFavoriteTalks.indexOf(b?.id))
    }

    return []
  }, [talks.nodes, userFavoriteTalks])
  const hasFavoriteTalks = favoriteTalks.length > 0

  if (!isUser) {
    navigate('/login/')
  }

  return (
    <Section>
      <Section.Sidebar>
        <AccountMenu />
      </Section.Sidebar>

      <Section.Content>
        {hasFavoriteTalks ? (
          <div className="divide-y divide-gray-200">
            <Page.Title>Your favorite talks:</Page.Title>
            <div className="mt-5">
              <TalkList talks={favoriteTalks} />
            </div>
          </div>
        ) : null}

        {!hasFavoriteTalks ? (
          <Link
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400"
            to="/talks/"
            type="button"
          >
            <Page.Title>Favorites</Page.Title>
            <p className="mt-2">
              Click the {<HeartIcon className="inline h-6 w-6 text-gray-400" />} to save an item to
              your favorites list.
            </p>
          </Link>
        ) : null}
      </Section.Content>
    </Section>
  )
}

export const Head: HeadFC = ({ location }) => {
  return <SEO title="Favorite Talks" location={location} />
}

export default AccountFavoritesPage

export const query = graphql`
  query AccountFavoritesPage {
    talks: allAirtableTalk(
      filter: { data: { publishedDate: { ne: null } } }
      sort: { data: { publishedDate: DESC } }
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
                    gatsbyImageData(width: 128, placeholder: DOMINANT_COLOR, layout: CONSTRAINED)
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
