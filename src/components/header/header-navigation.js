import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import { Link } from '~/components/link'
import { MobileMenu, MobileMenuButton } from '~/components/menus/mobile'
import { PrimaryMenu } from '~/components/menus/primary'
import { ProfileMenu } from '~/components/menus/profile'
import { Logo } from '~/components/svgs/logo'
import { PRIMARY_NAV } from '~/utils/constants'

function HeaderNavigation({ siteTitle }) {
  return (
    <Popover as="nav">
      {({ open }) => (
        <>
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <MobileMenuButton open={open} />
            </div>

            <h1 className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <Logo className="block h-6 w-auto md:h-8" />
                <span className="sr-only">{siteTitle}</span>
              </Link>
            </h1>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <PrimaryMenu navigation={PRIMARY_NAV} />
              <ProfileMenu />
            </div>
          </div>

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
            <Popover.Panel className="md:hidden">
              {({ close }) => <MobileMenu navigation={PRIMARY_NAV} onClick={close} />}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default HeaderNavigation
