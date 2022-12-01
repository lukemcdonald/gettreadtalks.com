import { Link } from '~/components/link'
import type { NavigationItem } from '~/utils/types/shared'

import WidgetTitle from './widget-title'

interface Props {
  className?: string
  navigation: NavigationItem[]
  title: string
}

function WidgetNavigation({ className, navigation, title }: Props) {
  return (
    <nav className={className}>
      <WidgetTitle>{title}</WidgetTitle>

      <ul className="mt-4 space-y-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link to={item.to} className="text-base text-gray-500 hover:text-gray-900">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default WidgetNavigation
