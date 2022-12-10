import React from 'react'
import clsx from 'clsx'

interface Props {
  children?: React.ReactNode
  className?: string
}

function WidgetTitle({ children, className }: Props) {
  return (
    <h3 className={clsx('text-sm font-semibold uppercase tracking-wider text-gray-400', className)}>
      {children}
    </h3>
  )
}

export default WidgetTitle
