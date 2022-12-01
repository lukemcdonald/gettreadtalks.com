import classNames from 'classnames'

export interface StyleMenuItemArgs {
  active?: boolean
  type?: 'link' | 'button'
}

interface StyleMenuItem {
  item: 'icon' | 'item'
  args?: StyleMenuItemArgs
}

export function getMenuItemStyles(item: StyleMenuItem['item'], args?: StyleMenuItem['args']) {
  switch (item) {
    case 'item':
      return classNames(
        args?.active ? 'bg-gray-50' : '',
        args?.type === 'button' ? 'w-full text-left' : '',
        'p-2 text-sm text-gray-600 rounded group flex items-center',
        'hover:text-gray-900 hover:bg-gray-100',
      )
    case 'icon':
      return classNames(
        args?.active ? '' : '',
        'w-5 h-5 mr-3 flex-none text-gray-500',
        'group-hover:text-primary-600',
      )
    default:
      throw new Error(`Unknown menu item type: ${item}`)
  }
}
