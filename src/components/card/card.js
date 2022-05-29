import React from 'react'

import CardContent from './card-content'
import CardIcon from './card-icon'
import CardIcons from './card-icons'
import CardImage from './card-image'
import CardSubtitle from './card-subtitle'
import CardText from './card-text'
import CardTitle from './card-title'
import CardWrapper from './card-wrapper'

function Card(props) {
  const { image, imageAlt, className, icons, subtitle, text, title, to, children } = props

  return (
    <CardWrapper className={className}>
      <CardImage image={image} alt={imageAlt} />
      <CardContent to={to} icons={icons} subtitle={subtitle} title={title} text={text} />
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
