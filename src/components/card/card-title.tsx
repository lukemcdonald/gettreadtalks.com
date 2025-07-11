import type { ReactNode } from 'react'
import clsx from 'clsx'

import { sanitizeHTMLTag } from '~/utils/misc'

interface Props {
  as: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
}

function CardTitle({ as, children, className }: Props) {
  const Tag: keyof JSX.IntrinsicElements = sanitizeHTMLTag(as, [
    'h1',
    'h2',
    'h3',
  ]) as keyof JSX.IntrinsicElements

  return (
    <Tag className={clsx('text-lg font-bold leading-6 text-gray-900', className)}>{children}</Tag>
  )
}

export default CardTitle
