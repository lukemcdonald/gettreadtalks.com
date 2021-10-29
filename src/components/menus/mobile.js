import React from 'react'
import classNames from 'classnames'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { Link } from 'components/link'

function MobileMenu({ navigation }) {
  return (
    <div className="absolute px-1 py-2 mt-2 space-y-1 bg-white rounded-md shadow-lg sm:w-48 right-6 left-6 ring-1 ring-black ring-opacity-5">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={classNames('block px-3 py-2 rounded text-base font-medium text-gray-900', 'hover:bg-gray-100')}
          activeClassName="bg-gray-900 text-white"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

function MobileMenuButton({ open }) {
  return (
    <Disclosure.Button
      className={classNames(
        'inline-flex items-center justify-center p-2 text-gray-900 rounded-md',
        'hover:ring-2 hover:ring-inset hover:ring-gray-900',
        'focus:ring-2 focus:ring-inset focus:ring-gray-900 focus:outline-none ',
      )}
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block w-6 h-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  )
}

export { MobileMenu, MobileMenuButton }
