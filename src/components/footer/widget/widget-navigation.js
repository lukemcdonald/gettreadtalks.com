import React from 'react'

import { Link } from '~/components/link'

import WidgetTitle from './widget-title'

function WidgetNavigation({ className, title, navigation }) {
  return (
    <nav className={className}>
      <WidgetTitle title={title} />

      <ul className="mt-4 space-y-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default WidgetNavigation
