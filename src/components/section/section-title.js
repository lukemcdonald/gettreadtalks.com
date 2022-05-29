import classNames from 'classnames'
import React from 'react'

import { sanitizeHTMLTag } from '~/utils/misc'

function SectionTitle({ children, className = '', as }) {
  const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3'])

  return (
    <Tag
      className={classNames(
        'mb-3 text-sm font-bold uppercase def:text-gray-500 tracking-wide lg:mb-2 lg:text-xs',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default SectionTitle
