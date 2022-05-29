import classNames from 'classnames'
import React from 'react'

import { Link } from '~/components/link'

import CardIcons from './card-icons'
import CardSubTitle from './card-subtitle'
import CardText from './card-text'
import CardTitle from './card-title'

function CardContent({ to = '', icons = [], subtitle, title, text }) {
  // Set context to the value between the first and second forward slash.
  // For example,"/speakers/john-piper/" would be "speakers"
  const context = to.slice(1, to.indexOf('/', 1)) || null

  return (
    <div className="min-w-0 flex-1 items-center">
      {subtitle && <CardSubTitle as="h3">{subtitle}</CardSubTitle>}

      <div>
        <Link to={to} className="inline focus:outline-none">
          <span className="absolute inset-0 z-0" aria-hidden="true" />
          <CardTitle as="h2" className={classNames('inline', icons.length > 0 && 'mr-2')}>
            {title}
          </CardTitle>
        </Link>

        {icons.length > 0 && (
          <CardIcons
            className="relative top-px z-10 inline-flex space-x-1"
            icons={icons}
            context={context}
          />
        )}
      </div>

      {text && <CardText>{text}</CardText>}
    </div>
  )
}

export default CardContent
