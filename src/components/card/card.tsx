import type { PropsWithChildren } from 'react'

import CardContent from './card-content'
import CardIcon from './card-icon'
import CardIcons from './card-icons'
import CardImage from './card-image'
import CardSubtitle from './card-subtitle'
import CardText from './card-text'
import CardTitle from './card-title'
import CardWrapper from './card-wrapper'

interface Props {
  className?: string
  icons?: string[]
  image: string
  imageAlt?: string
  subtitle?: string
  text: string
  title: string
  to: string
}

function Card({
  children,
  className,
  icons,
  image,
  imageAlt,
  subtitle,
  text,
  title,
  to,
}: PropsWithChildren<Props>) {
  return (
    <CardWrapper className={className}>
      <CardImage alt={imageAlt} image={image} />
      <CardContent icons={icons} subtitle={subtitle} text={text} to={to} title={title} />
      {children}
    </CardWrapper>
  )
}

export default Object.assign(Card, {
  Content: CardContent,
  Icon: CardIcon,
  Icons: CardIcons,
  Image: CardImage,
  Subtitle: CardSubtitle,
  Text: CardText,
  Title: CardTitle,
  Wrapper: CardWrapper,
})
