import classNames from 'classnames'
import React from 'react'

function SectionSidebar({ children, className, right, sticky }) {
  return (
    <div
      className={classNames(
        `pt-6 sm:py-6`,
        `sm:border-0`,
        right ? 'md:pl-6 lg:pl-10' : 'md:pr-6 lg:pr-10',
        `lg:col-span-3 lg:py-16`,
        className,
      )}
    >
      {sticky && <div className="sticky top-10">{children}</div>}
      {!sticky && children}
    </div>
  )
}

export default SectionSidebar
