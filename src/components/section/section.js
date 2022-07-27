import React from 'react'

import { sanitizeHTMLTag } from '~/utils/misc'

import SectionContent from './section-content'
import SectionSeparator from './section-separator'
import SectionSidebar from './section-sidebar'
import SectionTitle from './section-title'
import SectionWrapper from './section-wrapper'

function Section({ as, children, className, separator, separatorClass }) {
  const Tag = sanitizeHTMLTag(as, ['section', 'article', 'div', 'footer', 'header'])

  return (
    <Tag className={className}>
      <SectionWrapper>
        {(separator === 'top' || separator === 'top-bottom') && (
          <SectionSeparator className={separatorClass} />
        )}

        <div className="grid sm:grid-cols-3 sm:gap-6 lg:grid-cols-12">{children}</div>

        {(separator === 'bottom' || separator === 'top-bottom') && (
          <SectionSeparator className={separatorClass} />
        )}
      </SectionWrapper>
    </Tag>
  )
}

export default Object.assign(Section, {
  Content: SectionContent,
  Separator: SectionSeparator,
  Sidebar: SectionSidebar,
  Title: SectionTitle,
  Wrapper: SectionWrapper,
})
