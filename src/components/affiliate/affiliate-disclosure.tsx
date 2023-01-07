import type { ReactNode } from 'react'
import { useState } from 'react'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
  title: string
}

function AffiliateDisclosure({ children, className, title }: Props) {
  const [open, setOpen] = useState(false)

  function handleOpenToggle() {
    setOpen(!open)
  }

  return (
    <div
      className={clsx(
        'z-40 mb-1 mr-1 rounded-sm px-1 text-xs def:absolute def:bottom-0 def:right-0 def:bg-gray-200 def:text-gray-500',
        className,
      )}
    >
      <button className="py-1 leading-none" onClick={handleOpenToggle} type="button">
        {title}
      </button>

      {open ? (
        <div className="absolute bottom-6 -left-96 rounded-sm bg-gray-200 px-3 py-2 text-left text-xs text-gray-500 ring-4 ring-white">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default AffiliateDisclosure
