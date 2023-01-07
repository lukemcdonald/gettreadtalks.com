import type { ComponentType, ReactNode } from 'react'
import { Menu } from '@headlessui/react'

import type { StyleMenuItemArgs } from './utils'
import { Link } from '~/components/link'
import { getMenuItemStyles } from './utils'

interface MenuItemTypeProps {
  active: boolean
  children: ReactNode
}

interface Props {
  as?: StyleMenuItemArgs['type']
  icon: ComponentType<{ className: string }>
  onClick?: () => void
  title: string
  to: string
}

function ProfileMenuItem({ as = 'link', to, title, icon: Icon, onClick }: Props) {
  const types = {
    link: ({ active, children }: MenuItemTypeProps) => (
      <Link className={getMenuItemStyles('item', { active })} to={to}>
        {children}
      </Link>
    ),
    button: ({ active, children }: MenuItemTypeProps) => (
      <button
        className={getMenuItemStyles('item', { active, type: 'button' })}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    ),
  }

  const Item = types[as]

  return (
    <Menu.Item>
      {({ active }) => (
        <Item active={active}>
          <Icon className={getMenuItemStyles('icon')} />
          <span>{title}</span>
        </Item>
      )}
    </Menu.Item>
  )
}

export default ProfileMenuItem
