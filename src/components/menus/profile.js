import React, { Fragment } from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'

import { Link } from 'components/link'
import { useAuth } from 'context/auth'
import { useAsync } from 'hooks/async'

function styleMenu(item = '', args = {}) {
	const { active, type } = args

	switch (item) {
		case 'item':
			return classNames(
				active ? 'bg-gray-100' : '',
				type === 'button' ? 'w-full text-left' : '',
				'block px-3 py-2 text-sm text-gray-600 rounded',
				'hover:text-gray-900'
			)
		default:
	}
}

function ProfileMenu() {
	const { run } = useAsync()
	const { isUser, logout } = useAuth()

	if (!isUser) {
		return (
			<>
				<span className="inline-block ml-3 mr-1 border-l border-gray-400 sm:hidden md:block">
					&nbsp;
				</span>
				<Link
					to="/login"
					className={classNames(
						'px-3 py-1 rounded-md text-lg font-medium text-gray-900 flex items-center',
						'hover:text-red-600'
					)}
				>
					Sign in <ArrowRightIcon className="w-4 h-4 flex-none ml-1.5" />
				</Link>
			</>
		)
	}

	return (
		<Menu as="div" className="relative ml-3">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className={classNames('flex text-lg rounded-full')}>
							<span className="sr-only">Open user menu</span>
							<UserCircleIcon className="w-8 h-8 rounded-full" />
						</Menu.Button>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							static
							className={classNames(
								'absolute right-0 w-48 p-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5',
								'focus:outline-none'
							)}
						>
							<Menu.Item>
								{({ active }) => (
									<Link
										to="/account/"
										className={styleMenu('item', { active })}
									>
										Your Account
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										to="/account/favorites/"
										className={styleMenu('item', { active })}
									>
										Favorites
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										to="/account/finished/"
										className={styleMenu('item', { active })}
									>
										Finished
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										type="button"
										onClick={() => run(logout())}
										className={styleMenu('item', { active, type: 'button' })}
									>
										Sign out
									</button>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	)
}

export { ProfileMenu }
