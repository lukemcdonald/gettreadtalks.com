import CardIcon from './card-icon'

import type { TAny } from '~/utils/types/shared'
import { sanitizeHTMLTag } from '~/utils/misc'

interface Props {
  as?: 'div' | 'span'
  className?: string
  context: string
  icons: string[]
}

function CardIcons({ as, className, context, icons = [] }: Props) {
  const Tag: TAny = sanitizeHTMLTag(as, ['div', 'span'])
  let filteredIcons = icons

  if (icons.includes('favorite') && icons.includes('featured')) {
    filteredIcons = icons.filter((item) => item !== 'featured')
  }

  return (
    <Tag className={className}>
      {filteredIcons.map((type, index) => {
        const isFeatured = type === 'featured'
        const linkTo = isFeatured && !!context ? `/${context}/featured/` : ''
        return <CardIcon key={index} to={linkTo} type={type} />
      })}
    </Tag>
  )
}

export default CardIcons
