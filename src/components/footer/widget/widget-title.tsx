import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
}

function WidgetTitle({ children, className }: PropsWithChildren<Props>) {
  return (
    <h3 className={clsx('text-sm font-semibold uppercase tracking-wider text-gray-400', className)}>
      {children}
    </h3>
  )
}

export default WidgetTitle
