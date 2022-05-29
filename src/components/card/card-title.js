import classNames from 'classnames'
import React from 'react'

import { sanitizeHTMLTag } from '~/utils/misc'

function CardTitle({ children, className, as }) {
  const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3'])

  return (
    <Tag className={classNames('text-lg font-bold leading-6 text-gray-900', className)}>
      {children}
    </Tag>
  )
}

export default CardTitle
