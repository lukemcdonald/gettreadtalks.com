import { Fragment } from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { UserCircleIcon as UserIcon } from '@heroicons/react/24/outline'

import AuthenticatedMenu from './profile-menu-authenticated'
import UnauthenticatedMenu from './profile-menu-unauthenticated'
import { useAuth } from '~/context/auth'

function ProfileMenu() {
  const { isUser } = useAuth()

  return (
    <Menu as="div" className="relative md:ml-4 md:border-l md:border-gray-300 md:pl-6">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center text-lg font-medium text-gray-900">
            <span className="flex items-center">
              <span className="hidden lg:block">Account</span>
              <UserIcon className="h-8 w-8 lg:hidden" />
              <ChevronDownIcon className="hidden h-6 w-6 lg:ml-1 lg:block" />
            </span>
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items
              className={classNames(
                'absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5',
                'focus:outline-none',
              )}
            >
              {isUser ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default ProfileMenu
