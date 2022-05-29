import classNames from 'classnames'
import React, { useState } from 'react'

function Disclosure({ children, className = '', title }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={classNames(
        'z-40 mb-1 mr-1 rounded-sm px-1 text-xs def:absolute def:bottom-0 def:right-0 def:text-gray-500 def:bg-gray-200',
        className,
      )}
    >
      <button type="button" onClick={() => setOpen(!open)} className="py-1 leading-none">
        {title}
      </button>

      {open && (
        <div className="absolute bottom-6 -left-96 rounded-sm bg-gray-200 px-3 py-2 text-left text-xs text-gray-500 ring-4 ring-white">
          {children}
        </div>
      )}
    </div>
  )
}

export { Disclosure }
