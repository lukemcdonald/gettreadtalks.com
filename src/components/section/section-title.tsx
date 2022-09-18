import React from 'react'
import classNames from 'classnames'

import { sanitizeHTMLTag } from '~/utils/misc'

const allowedTags = ['h1', 'h2', 'h3'] as const

interface Props {
  as?: typeof allowedTags[number]
  children: React.ReactNode
  className?: string
}

function SectionTitle({ as, children, className = '' }: Props) {
  const Tag = sanitizeHTMLTag(as, Array.from(allowedTags)) as React.ElementType

  return (
    <Tag
      className={classNames(
        'mb-3 text-sm font-bold uppercase tracking-wide def:text-gray-500 lg:mb-2 lg:text-xs',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default SectionTitle
