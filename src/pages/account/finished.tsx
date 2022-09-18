// todo: Display five random featured talks as recomendations.
// todo: Display tabs for finished talks, clips, speakers.
import { useEffect, useState } from 'react'
import type { PageProps } from 'gatsby'
import { graphql, navigate } from 'gatsby'
import { CheckCircleIcon as CheckIcon } from '@heroicons/react/24/outline'

import type { TAny } from '~/utils/types/shared'
import { AccountMenu } from '~/components/account-menu'
import { Link } from '~/components/link'
import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { TalkList } from '~/components/talk'
import { useAuth } from '~/context/auth'
import { useUsers } from '~/context/users'

type Props = PageProps<Queries.AccountFinishedPageQuery>

function AccountFinishedPage({ data, location }: Props) {
  const [finishedTalks, setFinishedTalks] = useState([])
  const { isUser } = useAuth()
  const { user } = useUsers()
  const { talks } = data
  const userFinishedTalks = user?.finishedTalks
  const hasFinishedTalks = Array.isArray(finishedTalks) && finishedTalks.length

  useEffect(() => {
    if (talks && userFinishedTalks) {
      // Get finished user talks.
      const finished = talks.nodes.filter(({ id }) => userFinishedTalks.includes(id))

      // Update finished talks to match order of user finished; latest finished talk shown first.
      const sortedFinished: TAny = finished.slice().sort((a, b) => {
        return userFinishedTalks.indexOf(a?.id) - userFinishedTalks.indexOf(b?.id)
      })

      setFinishedTalks(sortedFinished)
    }
  }, [talks, userFinishedTalks])

  if (!isUser) {
    navigate('/login/')
  }

  return (
    <>
      <SEO title="Finished Talks" location={location} />

      <Section>
        <Section.Sidebar>
          <AccountMenu />
        </Section.Sidebar>

        <Section.Content>
          {hasFinishedTalks ? (
            <div className="divide-y divide-gray-200">
              <Page.Title>Your finished talks:</Page.Title>
              <div className="mt-5">
                <TalkList talks={finishedTalks} />
              </div>
            </div>
          ) : null}

          {!hasFinishedTalks ? (
            <Link
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400"
              to="/talks/"
              type="button"
            >
              <Page.Title>Finished</Page.Title>
              <p className="mt-2">
                Click the {<CheckIcon className="inline h-6 w-6 text-gray-400" />} to save an item
                to your finished list.
              </p>
            </Link>
          ) : null}
        </Section.Content>
      </Section>
    </>
  )
}

export default AccountFinishedPage

export const query = graphql`
  query AccountFinishedPage {
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
