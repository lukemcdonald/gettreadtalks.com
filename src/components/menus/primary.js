import React from 'react'
import classNames from 'classnames'

import { Link } from 'components/link'

function PrimaryMenu({ navigation }) {
  return (
    <div className="hidden md:block md:ml-6">
      <div className="flex space-x-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={classNames('px-3 py-1 rounded-md text-lg font-medium text-gray-900', 'hover:text-primary-600')}
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
