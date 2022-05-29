import classNames from 'classnames'
import React from 'react'

import { sanitizeHTMLTag } from '~/utils/misc'

function CardSubTitle({ children, className, as }) {
  const Tag = sanitizeHTMLTag(as, ['h2', 'h3'])

  return (
    <Tag
      className={classNames(
        'mb-2 mt-1 text-xs font-bold uppercase leading-none tracking-wide text-primary-600',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default CardSubTitle
