import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import { Section } from '~/components/section'

import IntroTagline from './intro-tagline'
import IntroTitle from './intro-title'

function Intro({ align, bgGradient, children, className, image, fullscreen }) {
  const imageSrc =
    image?.childImageSharp?.gatsbyImageData ||
    image?.localFiles?.[0]?.childImageSharp?.gatsbyImageData

  return (
    <section
      className={classNames(
        'relative flex bg-gray-900 text-center',
        bgGradient ? 'bg-image-gradient' : '',
        className,
      )}
      style={{ minHeight: fullscreen ? 'calc(100vh - 116px)' : '300px' }}
    >
      {imageSrc && (
        <div className="absolute inset-0 grid overflow-hidden">
          <GatsbyImage image={imageSrc} alt="Intro background image" />
        </div>
      )}

      <Section as="div" className="flex flex-grow items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <Section.Content className="relative px-4 sm:col-span-3" align={align}>
          {children}
        </Section.Content>
      </Section>
    </section>
  )
}

export default Object.assign(Intro, {
  Title: IntroTitle,
  Tagline: IntroTagline,
})
