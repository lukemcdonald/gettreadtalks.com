import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'

import { Section } from '~/components/section'
import type { SectionContentProps } from '~/components/section/section-content'
import type { TAny } from '~/utils/types/shared'

import IntroTagline from './intro-tagline'
import IntroTitle from './intro-title'

interface Props {
  align?: SectionContentProps['align']
  bgGradient?: boolean
  children?: React.ReactNode
  className?: string
  fullscreen?: boolean
  image?: TAny // ImageComponentProps
}

function Intro({ align, bgGradient, children, className, fullscreen, image }: Props) {
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
      {imageSrc ? (
        <div className="absolute inset-0 grid overflow-hidden">
          <GatsbyImage image={imageSrc} alt="Intro background image" />
        </div>
      ) : null}

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
  Tagline: IntroTagline,
  Title: IntroTitle,
})
