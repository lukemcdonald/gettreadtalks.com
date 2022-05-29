import { Popover } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React from 'react'

import { Link } from '~/components/link'

function MobileMenu({ navigation, onClick }) {
  return (
    <div className="absolute right-0 left-0 mt-2 space-y-1 rounded-md bg-white px-1 py-2 shadow-lg ring-1 ring-black ring-opacity-5 w-60">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={classNames(
            'flex items-center rounded px-3 py-2 text-base text-gray-600',
            'hover:text-gray-900 hover:bg-gray-100',
          )}
          activeClassName="bg-gray-900 text-white hover:bg-gray-900"
          onClick={onClick}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

function MobileMenuButton({ open }) {
  return (
    <Popover.Button
      className={classNames(
        'inline-flex items-center justify-center rounded-md p-2 text-gray-900',
        // 'hover:ring-2 hover:ring-inset hover:ring-gray-900',
        // 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 ',
      )}
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Popover.Button>
  )
}

export { MobileMenu, MobileMenuButton }
