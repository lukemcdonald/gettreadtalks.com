import type { ReactNode } from 'react'
import clsx from 'clsx'

import { sanitizeHTMLTag } from '~/utils/misc'

interface Props {
  as: 'h2' | 'h3'
  children: ReactNode
  className?: string
}

function CardSubtitle({ as, children, className }: Props) {
  const Tag: keyof JSX.IntrinsicElements = sanitizeHTMLTag(as, [
    'h2',
    'h3',
  ]) as keyof JSX.IntrinsicElements

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

export default CardSubtitle
