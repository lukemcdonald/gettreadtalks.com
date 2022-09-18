import classNames from 'classnames'

import { Link } from '~/components/link'
import type { TLink } from '~/utils/types/shared'

interface Props {
  navigation: TLink[]
}

function PrimaryMenu({ navigation }: Props) {
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

export default PrimaryMenu
