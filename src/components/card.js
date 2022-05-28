import { CheckIcon, HeartIcon, StarIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from 'react'

import { Image, Link } from '~/components'
import { sanitizeHTMLTag } from '~/utils/misc'

function CardTitle({ children, className, as }) {
  const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3'])

  return (
    <Tag className={classNames('text-lg font-bold leading-6 text-gray-900', className)}>
      {children}
    </Tag>
  )
}

function CardSubTitle({ children, className, as }) {
  const Tag = sanitizeHTMLTag(as, ['h2', 'h3'])

  return (
    <Tag
      className={classNames(
        'mb-2 mt-1 text-xs font-bold uppercase leading-none tracking-wide text-primary-600',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

function CardText({ children, className }) {
  return (
    <div className={classNames('mt-px inline-block space-x-1 text-sm text-gray-500', className)}>
      {children}
    </div>
  )
}

function CardIcon({ className, to, type }) {
  const icons = {
    favorite: {
      title: 'Favorite',
      style: 'text-favorite-700 bg-favorite-100 hover:bg-favorite-200',
      to: to || '/account/favorites/',
      icon: (props) => <HeartIcon {...props} />,
    },
    featured: {
      title: 'Featured',
      style: 'text-featured-700 bg-featured-100 hover:bg-featured-200',
      to: to || '/talks/featured/',
      icon: (props) => <StarIcon {...props} />,
    },
    finished: {
      title: 'Finished',
      style: 'text-finished-700 bg-finished-100 hover:bg-finished-200',
      to: to || '/account/finished/',
      icon: (props) => <CheckIcon {...props} />,
    },
  }

  const item = icons[type]

  return (
    <Link to={item.to} className={classNames('rounded-full', className)}>
      <span
        className={classNames(
          'group flex items-center space-x-1 rounded-full px-1 py-1 text-xs font-medium',
          item.style,
        )}
      >
        <item.icon className="h-3.5 w-3.5 transition-colors" />
        <span className="hidden pr-1">{item.title}</span>
      </span>
    </Link>
  )
}

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

function CardWrapper({ children, className }) {
  return (
    <article
      className={classNames(
        'relative flex flex-grow items-center space-x-3 rounded bg-white p-4 text-left text-gray-700 shadow-sm transition duration-300',
        'ring-2 ring-transparent hover:ring-white',
        'hover:shadow-lg',
        className,
      )}
    >
      {children}
    </article>
  )
}

function CardImage({ className, image, alt, ...props }) {
  return (
    <>
      {image && (
        <Image
          image={image}
          className={classNames('flex-shrink-0', className || 'h-16 w-16 rounded-full')}
          imgClassName="rounded-full"
          {...props}
        />
      )}
    </>
  )
}

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

export { Card, CardWrapper, CardImage, CardContent, CardTitle, CardText }
