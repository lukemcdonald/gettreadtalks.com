import type { ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
}

function SectionWrapper({ className, children }: Props) {
  return <div className={clsx('container max-w-screen-xl', className)}>{children}</div>
}

export default SectionWrapper
