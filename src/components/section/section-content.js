import classNames from 'classnames'
import React from 'react'

import { sanitizeHTMLTag } from '~/utils/misc'

function SectionContent({ align, as, children, className }) {
  const Tag = sanitizeHTMLTag(as, ['div', 'article', 'footer', 'header', 'section'])

  const alignMapping = {
    DEFUALT: { start: 'lg:col-start-4', span: 'lg:col-span-6' },
    wide: { start: 'lg:col-start-4', span: 'lg:col-span-9' },
    'wide--center': { start: 'lg:col-start-2', span: 'lg:col-span-10' },
    full: { start: 'lg:col-start-1', span: 'lg:col-span-12' },
  }

  const columns = alignMapping[align] || alignMapping.DEFUALT

  return (
    <Tag
      className={classNames(
        'py-6 sm:col-span-2 lg:py-16',
        `${columns.start} ${columns.span}`,
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default SectionContent
