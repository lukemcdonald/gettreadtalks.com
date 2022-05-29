import classNames from 'classnames'
import React from 'react'

import { Link } from '~/components/link'

function PrimaryMenu({ navigation }) {
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={classNames(
              'rounded-md px-3 py-1 text-lg font-medium text-gray-900',
              'hover:text-primary-600',
            )}
            activeClassName="uppercase font-extrabold text-primary-600 tracking-tight"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export { PrimaryMenu }
