// Schema.org utility functions for structured data
const BASE_URL = process.env.BASE_URL ?? 'https://gettreadtalks.com'

export interface Speaker {
  title?: string | null
  website?: string | null
  ministry?: string | null
}

export interface Talk {
  title?: string | null
  scripture?: string | null
  slug?: string | null
}

export interface Series {
  title?: string | null
  slug?: string | null
  description?: string | null
}

export function createAudioObjectSchema(talk: Talk, speaker: Speaker, pathname: string) {
  const talkTitle = talk.title || 'Untitled Talk'
  const speakerName = speaker.title || 'Unknown Speaker'

  return {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: talkTitle,
    description: `Listen to ${talkTitle} by ${speakerName}${talk.scripture ? ` from ${talk.scripture}` : ''}.`,
    url: `${BASE_URL}${pathname}`,
    author: {
      '@type': 'Person',
      name: speakerName,
      jobTitle: 'Minister',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TREAD Talks',
      url: BASE_URL,
    },
    about: talk.scripture
      ? {
          '@type': 'Thing',
          name: talk.scripture,
        }
      : undefined,
    keywords: [
      'sermon',
      'christian',
      'bible',
      'faith',
      'gospel',
      speakerName,
      ...(talk.scripture ? [talk.scripture] : []),
    ].filter(Boolean),
    inLanguage: 'en',
    isAccessibleForFree: true,
  }
}

export function createPersonSchema(speaker: Speaker, pathname: string) {
  const speakerName = speaker.title || 'Unknown Speaker'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: speakerName,
    jobTitle: 'Minister',
    description: `${speakerName} is a faithful minister of the Gospel${speaker.ministry ? ` at ${speaker.ministry}` : ''}.`,
    url: `${BASE_URL}${pathname}`,
    ...(speaker.website && { sameAs: [speaker.website] }),
    worksFor: {
      '@type': 'Organization',
      name: 'TREAD Talks',
      url: BASE_URL,
    },
  }
}

export function createSeriesSchema(series: Series, pathname: string) {
  const seriesTitle = series.title || 'Untitled Series'

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: seriesTitle,
    description: series.description || `A series of Christian sermons titled "${seriesTitle}".`,
    url: `${BASE_URL}${pathname}`,
    publisher: {
      '@type': 'Organization',
      name: 'TREAD Talks',
      url: BASE_URL,
    },
    genre: 'Religious',
    inLanguage: 'en',
  }
}

export function createWebPageSchema(
  title: string,
  description: string,
  pathname: string,
  keywords: string[] = [],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${BASE_URL}${pathname}`,
    mainEntity: {
      '@type': 'Organization',
      name: 'TREAD Talks',
      url: BASE_URL,
      description:
        'Exercise your inner man with Christ centered sermons to elevate your spiritual heartbeat while working out your physical one.',
      founder: {
        '@type': 'Person',
        name: 'Luke McDonald',
        url: 'https://lukemcdonald.com',
      },
      sameAs: [
        'https://twitter.com/gettreadtalks',
        'https://www.facebook.com/gettreadtalks',
        'https://www.instagram.com/gettreadtalks',
      ],
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Christian Sermons',
      },
      {
        '@type': 'Thing',
        name: 'Biblical Teaching',
      },
      {
        '@type': 'Thing',
        name: 'Spiritual Growth',
      },
    ],
    keywords: [
      'christian sermons',
      'biblical teaching',
      'spiritual growth',
      'gospel',
      'faith',
      ...keywords,
    ],
  }
}
