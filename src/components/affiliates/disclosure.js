import React, { useState } from 'react'
import classNames from 'classnames'

function Disclosure({ children, className = '', title }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={classNames(
        'px-1 mb-1 mr-1 text-xs rounded-sm z-40',
        className.includes('absolute') || 'absolute bottom-0 right-0',
        className.includes('text-gray-') || 'text-gray-500',
        className.includes('bg-gray-') || 'bg-gray-200',
        className,
      )}
    >
      <button type="button" onClick={() => setOpen(!open)} className="py-1 leading-none">
        {title}
      </button>

      {open && (
        <div className="absolute px-3 py-2 text-xs text-left text-gray-500 bg-gray-200 rounded-sm bottom-6 -left-96 ring-4 ring-white">
          {children}
        </div>
      )}
    </div>
  )
}

export { Disclosure }
