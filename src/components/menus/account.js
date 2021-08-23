import React, { useState } from 'react'
import { CheckIcon, HeartIcon, UserIcon } from '@heroicons/react/outline'

import { Link } from 'components/link'
import { DeactivateAccountButton } from 'components/account/deactivate-button'

function AccountMenu() {
	const [navigation] = useState({
		Account: {
			to: '/account/',
			icon: <UserIcon />,
		},
		Favorites: {
			to: '/account/favorites/',
			icon: <HeartIcon />,
		},
		Finished: {
			to: '/account/finished/',
			icon: <CheckIcon />,
		},
	})

	return (
		<div className="font-medium text-gray-600">
			{Object.keys(navigation).map((title) => {
				const { to, icon } = navigation[title]
				return (
					<Link
						to={to}
						key={title}
						className="flex items-center px-2 py-2 mb-1 rounded-md"
						activeClassName="text-red-600"
					>
						{icon && <div className="w-6 h-6 mr-3 opacity-70">{icon}</div>}
						{title}
					</Link>
				)
			})}
			<hr className="mt-4 mb-2 border-t border-gray-200" />
			<DeactivateAccountButton
				className="px-2 py-2 hover:text-red-600"
				buttonText="Deactivate Account"
			/>
		</div>
	)
}

export { AccountMenu }
