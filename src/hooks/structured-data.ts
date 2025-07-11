import { useMemo } from 'react'
import type { Talk, Speaker, Series } from '~/utils/schema'
import {
  createAudioObjectSchema,
  createPersonSchema,
  createSeriesSchema,
  createWebPageSchema,
} from '~/utils/schema'

type StructuredDataContext =
  | { type: 'talk'; data: { talk: Talk; speaker: Speaker; pathname: string } }
  | { type: 'speaker'; data: { speaker: Speaker; pathname: string } }
  | { type: 'series'; data: { series: Series; pathname: string } }
  | { type: 'homepage'; data: { pathname: string } }

export function useStructuredData(context: StructuredDataContext) {
  return useMemo(() => {
    switch (context.type) {
      case 'talk':
        return [
          createAudioObjectSchema(context.data.talk, context.data.speaker, context.data.pathname),
        ]

      case 'speaker':
        return [createPersonSchema(context.data.speaker, context.data.pathname)]

      case 'series':
        return [createSeriesSchema(context.data.series, context.data.pathname)]

      case 'homepage':
        return [
          createWebPageSchema(
            'TREAD Talks - Exercise Your Inner Man',
            'Workout your salvation with Christ-centered sermons to elevate your spiritual heartbeat.',
            context.data.pathname,
            ['exercise', 'workout', 'salvation'],
          ),
        ]

      default:
        return []
    }
  }, [context])
}
