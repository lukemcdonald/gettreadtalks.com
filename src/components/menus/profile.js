import React, { Fragment } from 'react'
import classNames from 'classnames'
import { Menu, Transition } from '@headlessui/react'
import {
  LoginIcon,
  LogoutIcon,
  HeartIcon,
  CheckCircleIcon as CheckIcon,
  UserCircleIcon as UserIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { Link } from 'components/link'
import { useAuth } from 'context/auth'
import { useAsync } from 'hooks/async'
import { ProfileCard } from 'components/account/profile-card'

function styleMenuItem(item = '', args = {}) {
  const { active, type } = args

  switch (item) {
    case 'item':
      return classNames(
        active ? 'bg-gray-50' : '',
        type === 'button' ? 'w-full text-left' : '',
        'block p-2 text-sm text-gray-600 rounded group flex items-center',
        'hover:text-primary-600',
      )
    case 'icon':
      return classNames(active ? '' : '', 'w-5 h-5 mr-3 flex-none text-gray-400', 'group-hover:text-primary-600')
    default:
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
      <button type="button" onClick={onClick} className={styleMenuItem('item', { active, type: 'button' })}>
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
        <ProfileMenuItem to="/account/" icon={LogoutIcon} title="Sign out" as="button" onClick={() => run(logout())} />
      </div>
    </>
  )
}

function ProfileMenu() {
  const { isUser } = useAuth()

  return (
    <Menu as="div" className="relative pl-6 ml-4 border-l border-gray-300">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center text-lg font-medium text-gray-900">
            <span className="flex items-center">
              Account <ChevronDownIcon className="w-5 h-5 ml-2" />
            </span>
          </Menu.Button>

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
              className={classNames(
                'absolute right-0 w-60 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100',
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
