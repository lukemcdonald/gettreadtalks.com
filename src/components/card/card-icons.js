import React from 'react'

import { sanitizeHTMLTag } from '~/utils/misc'

import CardIcon from './card-icon'

function CardIcons({ className, icons = [], as, context = '' }) {
  const Tag = sanitizeHTMLTag(as, ['div', 'span'])
  let filteredIcons = icons

  if (icons.includes('favorite') && icons.includes('featured')) {
    filteredIcons = icons.filter((item) => item !== 'featured')
  }

  return (
    <Tag className={className}>
      {filteredIcons.map((type, index) => {
        let linkTo

        if (context && type === 'featured') {
          linkTo = `/${context}/featured/`
        }

        return <CardIcon key={index} type={type} context={context} to={linkTo} />
      })}
    </Tag>
  )
}

export default CardIcons
