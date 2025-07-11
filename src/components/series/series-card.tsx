import { Card } from '~/components/card'
import { Image } from '~/components/image'
import { Link } from '~/components/link'

export interface SeriesCardBase {
  id: string
  slug: string
}

export interface SeriesCardData {
  publishedTalksCount: number
  speakers: any
  title: string
}

export interface SeriesCardProps {
  series: SeriesCardBase & SeriesCardData
}

function SeriesCard({ series }: SeriesCardProps) {
  interface Speaker {
    data: {
      avatar: any
      title: string
    }
    fields: {
      slug: string
    }
    id: string
  }

  const uniqueSpeakers =
    series?.speakers?.filter((speaker: Speaker, index: number, self: Speaker[]) => {
      return speaker && index === self.findIndex((current) => current?.id === speaker?.id)
    }) || []

  const maxSpeakers = 3
  const uniqueSpeakersList = uniqueSpeakers.slice(0, maxSpeakers + 1)

  return (
    <Card.Wrapper className="flex-col items-start sm:flex-row sm:items-center">
      <Link to={series.slug} className="flex-grow">
        <span className="absolute inset-0 z-0" aria-hidden="true" />

        <Card.Title as="h2">{series.title}</Card.Title>

        {series.publishedTalksCount ? (
          <Card.Text>
            <span>
              {series.publishedTalksCount === 1
                ? `${series.publishedTalksCount} Talk`
                : `${series.publishedTalksCount} Talks`}
            </span>
          </Card.Text>
        ) : null}
      </Link>

      <div className="mt-2 flex -space-x-4 sm:mt-0">
        {uniqueSpeakersList.map((speaker: Speaker, index: number) => {
          const moreSpeakersCount = Math.max(0, uniqueSpeakers.length - maxSpeakers)
          const hasMoreSpeakers = moreSpeakersCount > 0 && index === moreSpeakersCount + 1

          if (!hasMoreSpeakers) {
            return (
              <Link
                className="relative z-30 transform rounded-full leading-none transition hover:z-40 hover:scale-110 hover:shadow-lg"
                key={speaker.fields.slug}
                to={speaker.fields.slug}
              >
                <Image
                  alt={speaker.data.title}
                  className="block h-12 w-12 rounded-full ring-2 ring-white"
                  image={speaker.data.avatar}
                  imgClassName="rounded-full"
                />
              </Link>
            )
          }

          return (
            <Link
              className="relative z-20 flex h-12 w-12 transform items-center justify-end rounded-full bg-gray-400 pr-2 text-sm font-medium leading-none text-white ring-2 ring-white transition-all hover:z-40 hover:scale-110 hover:pr-4 hover:text-base hover:shadow-lg"
              key={series.slug}
              to={series.slug}
            >
              <span className="text-xs">+</span>
              <span>{moreSpeakersCount}</span>
              <span className="sr-only">Speakers</span>
            </Link>
          )
        })}
      </div>
    </Card.Wrapper>
  )
}

export default SeriesCard
