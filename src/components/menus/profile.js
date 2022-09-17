import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  CheckCircleIcon as CheckIcon,
  HeartIcon,
  ArrowRightOnRectangleIcon as LoginIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
  UserCircleIcon as UserIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React, { Fragment } from 'react'

import { ProfileCard } from '~/components/account/profile-card'
import { Link } from '~/components/link'
import { useAuth } from '~/context/auth'
import { useAsync } from '~/hooks/async'

function styleMenuItem(item = '', args = {}) {
  const { active, type } = args

  switch (item) {
    case 'item':
      return classNames(
        active ? 'bg-gray-50' : '',
        type === 'button' ? 'w-full text-left' : '',
        'p-2 text-sm text-gray-600 rounded group flex items-center',
        'hover:text-gray-900 hover:bg-gray-100',
      )
    case 'icon':
      return classNames(
        active ? '' : '',
        'w-5 h-5 mr-3 flex-none text-gray-500',
        'group-hover:text-primary-600',
      )
    default:
      throw new Error(`Unknown menu item type: ${item}`)
  }
}

const UnauthenticatedMenu = () => (
  <div className="p-1">
    <Menu.Item>
      {({ active }) => (
        <Link to="/login/" className={styleMenuItem('item', { active })}>
          <LoginIcon className={styleMenuItem('icon', { active })} /> Sign in
        </Link>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <Link to="/register/" className={styleMenuItem('item', { active })}>
          <UserIcon className={styleMenuItem('icon', { active })} /> Create an account
        </Link>
      )}
    </Menu.Item>
  </div>
)

function ProfileMenuItem({ as, to, title, icon: Icon, onClick }) {
  const types = {
    link: ({ active, children }) => (
      <Link to={to} className={styleMenuItem('item', { active })}>
        {children}
      </Link>
    ),
    button: ({ active, children }) => (
      <button
        type="button"
        onClick={onClick}
        className={styleMenuItem('item', { active, type: 'button' })}
      >
        {children}
      </button>
    ),
  }

  const Item = as === 'button' ? types.button : types.link

  return (
    <Menu.Item>
      {({ active }) => (
        <Item active={active}>
          <Icon className={styleMenuItem('icon', { active })} />
          <span>{title}</span>
        </Item>
      )}
    </Menu.Item>
  )
}
const AuthenticatedMenu = () => {
  const { logout, profile } = useAuth()
  const { run } = useAsync()

  return (
    <>
      <div className="px-3.5 py-3">
        <ProfileCard profile={profile} showAvatar="hide" />
      </div>
      <div className="p-1">
        <ProfileMenuItem to="/account/favorites/" icon={HeartIcon} title="Favorites" />
        <ProfileMenuItem to="/account/finished/" icon={CheckIcon} title="Finished" />
      </div>
      <div className="p-1">
        <ProfileMenuItem to="/account/" icon={UserIcon} title="Settings" />
        <ProfileMenuItem
          to="/account/"
          icon={LogoutIcon}
          title="Sign out"
          as="button"
          onClick={() => run(logout())}
        />
      </div>
    </>
  )
}

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

export { ProfileMenu }
