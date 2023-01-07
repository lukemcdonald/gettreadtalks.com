import type { ReactNode } from 'react'
import clsx from 'clsx'

import { sanitizeHTMLTag } from '~/utils/misc'
import type { TAny } from '~/utils/types/shared'

interface Props {
  as: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
}

function CardTitle({ as, children, className }: Props) {
  const Tag: TAny = sanitizeHTMLTag(as, ['h1', 'h2', 'h3'])

  return (
    <Tag className={clsx('text-lg font-bold leading-6 text-gray-900', className)}>{children}</Tag>
  )
}

export default CardTitle
