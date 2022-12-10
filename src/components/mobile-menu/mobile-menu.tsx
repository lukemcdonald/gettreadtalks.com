import clsx from 'clsx'

import { Link } from '~/components/link'
import type { TLink } from '~/utils/types/shared'

interface Props {
  navigation: TLink[]
  onClick: () => void
}

function MobileMenu({ navigation, onClick }: Props) {
  return (
    <div className="absolute right-0 left-0 mt-2 w-60 space-y-1 rounded-md bg-white px-1 py-2 shadow-lg ring-1 ring-black ring-opacity-5">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={clsx(
            'flex items-center rounded px-3 py-2 text-base text-gray-600',
            'hover:bg-gray-100 hover:text-gray-900',
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

export default MobileMenu
