import React from 'react'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

function PageTitle({ children, className }: Props) {
  return <h1 className={classNames('text-2xl text-gray-900', className)}>{children}</h1>
}

export default PageTitle
