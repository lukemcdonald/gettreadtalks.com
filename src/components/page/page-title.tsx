import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
}

function PageTitle({ children, className }: Props) {
  return <h1 className={clsx('text-2xl text-gray-900', className)}>{children}</h1>
}

export default PageTitle
