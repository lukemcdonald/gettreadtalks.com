import React from 'react'
import clsx from 'clsx'

interface Props {
  align?: 'left' | 'right'
  children: React.ReactNode
  className?: string
  isSticky?: boolean
}

function SectionSidebar({ children, className, align, isSticky }: Props) {
  return (
    <div
      className={clsx(
        `pt-6 sm:py-6`,
        `sm:border-0`,
        `lg:col-span-3 lg:py-16`,
        align === 'left' ? 'md:pr-6 lg:pr-10' : 'md:pl-6 lg:pl-10',
        className,
      )}
    >
      {isSticky ? <div className="sticky top-10">{children}</div> : children}
    </div>
  )
}

export default SectionSidebar
