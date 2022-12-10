import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
}

function CardText({ children, className }: Props) {
  return (
    <div className={clsx('mt-px inline-block space-x-1 text-sm text-gray-500', className)}>
      {children}
    </div>
  )
}

export default CardText
