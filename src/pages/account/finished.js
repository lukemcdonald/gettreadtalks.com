// todo: Display five random featured talks as recomendations.
// todo: Display tabs for finished talks, clips, speakers.
import { CheckCircleIcon as CheckIcon } from '@heroicons/react/outline'
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

function AccountFinishedPage({ data, location }) {
  const [finishedTalks, setFinishedTalks] = useState([])
  const { isUser } = useAuth()
  const { user } = useUsers()
  const { talks } = data

  useEffect(() => {
    if (!talks || !user?.finishedTalks) return null

    // Get user finished from all talks.
    const finished = talks.nodes.filter(({ id }) => user.finishedTalks.includes(id))

    // Update order of finished to match order of user finished.
    // The latest finished talk should be shown first.
    let sortedFinished = []
    user.finishedTalks.map((id) => {
      const finishedIndex = finished.findIndex((fav) => fav.id === id)

      if (finished[finishedIndex].id === id) {
        sortedFinished = [...sortedFinished, finished[finishedIndex]]
      }

      return sortedFinished
    })

    setFinishedTalks(sortedFinished)
  }, [talks, user])

  if (!isUser) {
    navigate('/login/')
    return null
  }

  return (
    <>
      <SEO title="Finished Talks" location={location} />

      <Section>
        <Section.Sidebar>
          <AccountMenu />
        </Section.Sidebar>

        <Section.Content>
          {!Array.isArray(finishedTalks) || !finishedTalks.length ? (
            <Link
              to="/talks/"
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400"
            >
              <Page.Title>Finished</Page.Title>
              <p className="mt-2">
                Click the {<CheckIcon className="inline h-6 w-6 text-gray-400" />} to save an item
                to your finished list.
              </p>
            </Link>
          ) : (
            <div className="divide-y divide-gray-200">
              <Page.Title>Your finished talks:</Page.Title>
              <div className="mt-5">
                <TalkList talks={finishedTalks} />
              </div>
            </div>
          )}
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
