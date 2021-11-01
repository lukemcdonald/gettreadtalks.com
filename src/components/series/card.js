import React from 'react'

import { Image } from 'components/image'
import { CardWrapper, CardTitle, CardText } from 'components/card'
import { Link } from 'components/link'

function SeriesCard({ series }) {
  const maxSpeakers = 3
  const uniqueSpeakers = series.speakers.filter(
    (speaker, index, self) => index === self.findIndex((current) => current.id === speaker.id),
  )

  return (
    <CardWrapper className="flex-col items-start sm:flex-row sm:items-center">
      <Link to={series.slug} className="flex-grow">
        <span className="absolute inset-0 z-0" aria-hidden="true" />

        <CardTitle as="h2">{series.title}</CardTitle>

        {series.publishedTalksCount && (
          <CardText>
            <span>
              {series.publishedTalksCount === 1
                ? `${series.publishedTalksCount} Talk`
                : `${series.publishedTalksCount} Talks`}
            </span>
          </CardText>
        )}
      </Link>

      <div className="flex mt-2 -space-x-4 sm:mt-0">
        {uniqueSpeakers.slice(0, maxSpeakers + 1).map((speaker, index) => {
          const moreSpeakersCount = Math.max(0, uniqueSpeakers.length - maxSpeakers)

          const hasMoreSpeakers = moreSpeakersCount > 0 && index === moreSpeakersCount + 1

          return hasMoreSpeakers ? (
            <Link
              className="relative z-20 flex items-center justify-end w-12 h-12 pr-2 text-sm font-medium leading-none text-white transition-all transform bg-gray-400 rounded-full hover:scale-110 hover:z-40 hover:shadow-lg hover:pr-4 hover:text-base ring-white ring-2"
              key={series.slug}
              to={series.slug}
            >
              <span className="text-xs">+</span>
              <span>{moreSpeakersCount}</span>
              <span className="sr-only">Speakers</span>
            </Link>
          ) : (
            <Link
              className="relative z-30 leading-none transition transform rounded-full hover:scale-110 hover:z-40 hover:shadow-lg"
              key={speaker.fields.slug}
              to={speaker.fields.slug}
            >
              <Image
                className="block w-12 h-12 rounded-full ring-white ring-2"
                imgClassName="rounded-full"
                image={speaker.data.avatar}
                alt={speaker.data.title}
              />
            </Link>
          )
        })}
      </div>
    </CardWrapper>
  )
}

export { SeriesCard }
