import React, { useMemo } from 'react'
import clsx from 'clsx'
import { CheckIcon, HeartIcon, StarIcon } from '@heroicons/react/20/solid'

import { Link } from '~/components/link'

interface Props {
  className?: string
  to: string
  type: string
}

interface CardIconItem {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  style: string
  title: string
  to: string
}

type CardIconItems = Record<string, CardIconItem>

function CardIcon({ className, to, type }: Props) {
  const icons: CardIconItems = useMemo(
    () => ({
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
    }),
    [to],
  )

  const item = icons[type]
  const Icon = item.icon

  return (
    <Link to={item.to} className={clsx('rounded-full', className)}>
      <span
        className={clsx(
          'group flex items-center space-x-1 rounded-full px-1 py-1 text-xs font-medium',
          item.style,
        )}
      >
        <Icon className="h-3.5 w-3.5 transition-colors" />
        <span className="sr-only pr-1">{item.title}</span>
      </span>
    </Link>
  )
}

export default CardIcon
