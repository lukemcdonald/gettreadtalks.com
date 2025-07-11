import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { GatsbyImage } from 'gatsby-plugin-image'
import type { IGatsbyImageData } from 'gatsby-plugin-image'

import { Section } from '~/components/section'
import type { SectionContentProps } from '~/components/section/section-content'

import IntroTagline from './intro-tagline'
import IntroTitle from './intro-title'

interface GatsbyImageFile {
  childImageSharp?: {
    gatsbyImageData: IGatsbyImageData
  } | null
  localFiles?: ReadonlyArray<{
    childImageSharp?: {
      gatsbyImageData: IGatsbyImageData
    } | null
  } | null> | null
}

interface Props {
  align?: SectionContentProps['align']
  bgGradient?: boolean
  className?: string
  fullscreen?: boolean
  image?: GatsbyImageFile | null
}

function Intro({
  align,
  bgGradient,
  children,
  className,
  fullscreen,
  image,
}: PropsWithChildren<Props>) {
  const imageSrc =
    image?.childImageSharp?.gatsbyImageData ||
    image?.localFiles?.[0]?.childImageSharp?.gatsbyImageData

  return (
    <section
      className={clsx(
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
