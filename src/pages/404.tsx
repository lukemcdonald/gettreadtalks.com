import type { HeadFC } from 'gatsby'

import { Intro } from '~/components/intro'
import { SEO } from '~/components/seo'

function NotFoundPage() {
  return (
    <Intro>
      <Intro.Title>Are you lost?</Intro.Title>

      <Intro.Tagline>
        <p>
          Sorry, but the page you are looking for cannot be found nor has it evolved into something
          else.
        </p>
      </Intro.Tagline>

      <figure className="aspect-w-16 aspect-h-9 mt-10 rounded shadow-lg">
        <iframe
          title="Steve Lawson's Gospel Presentation"
          className="rounded"
          width="640"
          height="360"
          src="https://www.youtube.com/embed/4exu-7RDdKE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </figure>
    </Intro>
  )
}

export const Head: HeadFC = ({ location }) => {
  return (
    <SEO
      title="404: Not found"
      description="This page could not be found. Browse our collection of Christ-centered sermons and speakers instead."
      location={location}
    />
  )
}

export default NotFoundPage
