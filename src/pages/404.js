import React from 'react'

import { SEO } from 'components/seo'
import { Intro } from 'components/intro'

function NotFoundPage({ location }) {
  return (
    <>
      <SEO title="404: Not found" location={location} />

      <Intro>
        <Intro.Title>Are you lost?</Intro.Title>

        <Intro.Tagline>
          <p>Sorry, but the page you are looking for cannot be found nor has it evolved into something else.</p>
        </Intro.Tagline>

        <figure className="mt-10 rounded shadow-lg aspect-w-16 aspect-h-9">
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
    </>
  )
}

export default NotFoundPage
