import classNames from 'classnames'

import { Link } from '~/components/link'

import CardIcons from './card-icons'
import CardSubTitle from './card-subtitle'
import CardText from './card-text'
import CardTitle from './card-title'

interface Props {
  icons?: string[]
  subtitle?: string
  text: string
  title: string
  to: string
}

function CardContent({ icons = [], subtitle, text, title, to = '' }: Props) {
  // Set context to the value between the first and second forward slash.
  // For example,"/speakers/john-piper/" would be "speakers"
  const context: string | null = to.slice(1, to.indexOf('/', 1)) || ''

  return (
    <div className="min-w-0 flex-1 items-center">
      {subtitle ? <CardSubTitle as="h3">{subtitle}</CardSubTitle> : null}

      <div>
        <Link to={to} className="inline focus:outline-none">
          <span className="absolute inset-0 z-0" aria-hidden="true" />
          <CardTitle as="h2" className={classNames('inline', icons.length > 0 && 'mr-2')}>
            {title}
          </CardTitle>
        </Link>

        {icons.length > 0 ? (
          <CardIcons
            className="relative top-px z-10 inline-flex space-x-1"
            context={context}
            icons={icons}
          />
        ) : null}
      </div>

      {text ? <CardText>{text}</CardText> : null}
    </div>
  )
}

export default CardContent
