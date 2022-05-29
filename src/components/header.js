import { Popover } from '@headlessui/react'
import React from 'react'

import { Link } from '~/components'
import { MobileMenu, MobileMenuButton } from '~/components/menus/mobile'
import { PrimaryMenu } from '~/components/menus/primary'
import { ProfileMenu } from '~/components/menus/profile'
import { Logo } from '~/components/svgs/logo'

const primaryNav = [
  { name: 'Talks', to: '/talks/' },
  { name: 'Speakers', to: '/speakers/' },
  { name: 'Series', to: '/series/' },
  { name: 'Clips', to: '/clips/' },
]

function SiteNavigation({ siteTitle }) {
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
              <PrimaryMenu navigation={primaryNav} />
              <ProfileMenu />
            </div>
          </div>

          <Popover.Panel className="md:hidden">
            {({ close }) => <MobileMenu navigation={primaryNav} onClick={close} />}
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}

function SiteHeader({ siteTitle }) {
  return (
    <header className="relative z-50 border-t-4 border-primary-600 bg-gradient-to-b from-gray-50">
      <div className="container max-w-screen-xl py-6 md:py-10">
        <SiteNavigation siteTitle={siteTitle} />
      </div>
    </header>
  )
}

export { SiteHeader, SiteNavigation }
