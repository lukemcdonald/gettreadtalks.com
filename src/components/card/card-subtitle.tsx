import React from 'react'
import clsx from 'clsx'

import { sanitizeHTMLTag } from '~/utils/misc'
import type { TAny } from '~/utils/types/shared'

interface Props {
  as: 'h2' | 'h3'
  children: React.ReactNode
  className?: string
}

function CardSubTitle({ as, children, className }: Props) {
  const Tag: TAny = sanitizeHTMLTag(as, ['h2', 'h3'])

  return (
    <Tag
      className={clsx(
        'mb-2 mt-1 text-xs font-bold uppercase leading-none tracking-wide text-primary-600',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default CardSubTitle
