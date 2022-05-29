import { CheckIcon, HeartIcon, StarIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from 'react'

import { Link } from '~/components/link'

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

export default CardIcon
