import React from 'react'
import {
	CheckCircleIcon as CheckIcon,
	HeartIcon,
	UserCircleIcon as UserIcon,
} from '@heroicons/react/outline'

import { Link } from 'components/link'
import classNames from 'classnames'

const navigation = [
	{ name: 'Favorites', to: '/account/favorites/', icon: HeartIcon },
	{ name: 'Completed', to: '/account/finished/', icon: CheckIcon },
	{ name: 'Account Settings', to: '/account/', icon: UserIcon },
]

function AccountMenu({ className }) {
	return (
		<nav
			className={classNames('space-y-1 font-medium text-gray-900', className)}
		>
			{navigation.map((item) => (
				<Link
					key={item.name}
					to={item.to}
					className="flex items-center px-2 py-2 rounded-md group hover:text-red-600"
					activeClassName="text-red-600"
				>
					<item.icon
						className="flex-shrink-0 w-6 h-6 mr-3 -ml-1 text-gray-400 group-hover:text-red-600"
						aria-hidden="true"
					/>
					<span className="truncate">{item.name}</span>
				</Link>
			))}
		</nav>
	)
}

export { AccountMenu }
