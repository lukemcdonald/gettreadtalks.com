import clsx from 'clsx'
import { Popover } from '@headlessui/react'
import { XMarkIcon as CloseIcon, Bars2Icon as MenuIcon } from '@heroicons/react/24/outline'

interface Props {
  open: boolean
}

function MobileMenuButton({ open }: Props) {
  return (
    <Popover.Button
      className={clsx(
        'inline-flex items-center justify-center rounded-md p-2 text-gray-900',
        // 'hover:ring-2 hover:ring-inset hover:ring-gray-900',
        // 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 ',
      )}
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <CloseIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Popover.Button>
  )
}

export default MobileMenuButton
