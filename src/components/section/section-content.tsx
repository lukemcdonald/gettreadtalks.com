import type { ElementType, ReactNode } from 'react'
import clsx from 'clsx'

import { sanitizeHTMLTag } from '~/utils/misc'

const _allowedAligns = ['DEFAULT', 'wide', 'wide--center', 'full'] as const
const allowedTags = ['div', 'article', 'footer', 'header', 'section'] as const

export interface SectionContentProps {
  align?: (typeof _allowedAligns)[number]
  as?: (typeof allowedTags)[number]
  children: ReactNode
  className?: string
}

function mapAlignToClassName(align: SectionContentProps['align']) {
  const values = {
    DEFAULT: { start: 'lg:col-start-4', span: 'lg:col-span-6' },
    wide: { start: 'lg:col-start-4', span: 'lg:col-span-9' },
    'wide--center': { start: 'lg:col-start-2', span: 'lg:col-span-10' },
    full: { start: 'lg:col-start-1', span: 'lg:col-span-12' },
  }
  return values[align ?? 'DEFAULT']
}

function SectionContent({ align, as, children, className }: SectionContentProps) {
  const columns = mapAlignToClassName(align)
  const Tag = sanitizeHTMLTag(as, Array.from(allowedTags)) as ElementType

  return (
    <Tag className={clsx('py-6 sm:col-span-2 lg:py-16', columns?.start, columns?.span, className)}>
      {children}
    </Tag>
  )
}

export default SectionContent
