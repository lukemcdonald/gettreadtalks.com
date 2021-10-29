/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import { Disclosure } from '@headlessui/react'

import { Link } from 'components/link'
import { Logo } from 'components/svgs/logo'
import { MobileMenu, MobileMenuButton } from 'components/menus/mobile'
import { PrimaryMenu } from 'components/menus/primary'
import { ProfileMenu } from 'components/menus/profile'

const primaryNav = [
  { name: 'About', to: '/about/' },
  { name: 'Clips', to: '/clips/' },
  { name: 'Series', to: '/series/' },
  { name: 'Speakers', to: '/speakers/' },
  { name: 'Talks', to: '/talks/' },
]

function SiteNavigation({ siteTitle }) {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <MobileMenuButton open={open} />
            </div>

            <h1 className="flex items-center justify-center flex-1 md:items-stretch md:justify-start">
              <Link to="/" className="flex items-center flex-shrink-0">
                <Logo className="block w-auto h-6 md:h-8" />
                <span className="sr-only">{siteTitle}</span>
              </Link>
            </h1>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <PrimaryMenu navigation={primaryNav} />
              <ProfileMenu />
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <MobileMenu navigation={primaryNav} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export { SiteNavigation }
