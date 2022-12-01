import classNames from 'classnames'

import { ACCOUNT_NAV } from '~/utils/constants'
import { Link } from '~/components/link'

interface Props {
  className?: string
}

function AccountMenu({ className }: Props) {
  return (
    <nav className={classNames('space-y-1 font-medium text-gray-500', className)}>
      {ACCOUNT_NAV.map(({ icon: Icon = '', name, to }) => (
        <Link
          key={name}
          to={to}
          className="group flex items-center rounded-md px-2 py-2"
          activeClassName="text-gray-900 hover:text-gray-900 opacity-100"
        >
          <Icon
            aria-hidden="true"
            className="mr-3 -ml-1 h-6 w-6 flex-shrink-0 group-hover:text-gray-900"
          />
          <span className="truncate">{name}</span>
        </Link>
      ))}
    </nav>
  )
}

export default AccountMenu
