import { Menu } from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon as LoginIcon,
  UserCircleIcon as UserIcon,
} from '@heroicons/react/24/outline'

import { Link } from '~/components/link'
import { getMenuItemStyles } from './utils'

const UnauthenticatedMenu = () => (
  <div className="p-1">
    <Menu.Item>
      {({ active }) => (
        <Link to="/login/" className={getMenuItemStyles('item', { active })}>
          <LoginIcon className={getMenuItemStyles('icon')} /> Sign in
        </Link>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <Link to="/register/" className={getMenuItemStyles('item', { active })}>
          <UserIcon className={getMenuItemStyles('icon')} /> Create an account
        </Link>
      )}
    </Menu.Item>
  </div>
)

export default UnauthenticatedMenu
