import {
  CheckCircleIcon as CheckIcon,
  HeartIcon,
  UserCircleIcon as UserIcon,
} from '@heroicons/react/outline'
import classNames from 'classnames'
import React from 'react'

import { Link } from '~/components'

const navigation = [
  {
    name: 'Account Settings',
    to: '/account/',
    icon: (props) => <UserIcon {...props} />,
  },
  {
    name: 'Favorites',
    to: '/account/favorites/',
    icon: (props) => <HeartIcon {...props} />,
  },
  {
    name: 'Finished',
    to: '/account/finished/',
    icon: (props) => <CheckIcon {...props} />,
  },
]

function AccountMenu({ className }) {
  return (
    <nav className={classNames('space-y-1 font-medium text-gray-500', className)}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className="group flex items-center rounded-md px-2 py-2"
          activeClassName="text-gray-900 hover:text-gray-900 opacity-100"
        >
          <item.icon
            className="mr-3 -ml-1 h-6 w-6 flex-shrink-0 group-hover:text-gray-900"
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </nav>
  )
}

export { AccountMenu }
