import type { ElementType, ReactNode } from 'react'

import SectionContent from './section-content'
import SectionSeparator from './section-separator'
import SectionSidebar from './section-sidebar'
import SectionTitle from './section-title'
import SectionWrapper from './section-wrapper'
import { sanitizeHTMLTag } from '~/utils/misc'
import type { Nullable } from '~/utils/types/shared'

const allowedTags = ['div', 'article', 'footer', 'header', 'section'] as const
const _allowedSeparators = ['top', 'bottom', 'top-bottom'] as const

interface Props {
  as?: (typeof allowedTags)[number]
  children: ReactNode
  className?: string
  separator?: Nullable<(typeof _allowedSeparators)[number]>
  separatorClass?: string
}

function Section({ as, children, className, separator, separatorClass }: Props) {
  const Tag = sanitizeHTMLTag(as, Array.from(allowedTags)) as ElementType
  const border = {
    top: separator === 'top' || separator === 'top-bottom',
    bottom: separator === 'bottom' || separator === 'top-bottom',
  }

  return (
    <Tag className={className}>
      <SectionWrapper>
        {border.top ? <SectionSeparator className={separatorClass} /> : null}

        <div className="grid sm:grid-cols-3 sm:gap-6 lg:grid-cols-12">{children}</div>

        {border.bottom ? <SectionSeparator className={separatorClass} /> : null}
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
