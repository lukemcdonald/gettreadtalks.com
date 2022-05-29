import React from 'react'

import HeaderNavigation from './header-navigation'

function Header({ siteTitle }) {
  return (
    <header className="relative z-50 border-t-4 border-primary-600 bg-gradient-to-b from-gray-50">
      <div className="container max-w-screen-xl py-6 md:py-10">
        <HeaderNavigation siteTitle={siteTitle} />
      </div>
    </header>
  )
}

export default Header
