import React from 'react'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

function IntroTagline({ children, className }: Props) {
  return (
    <div className={classNames('mt-2 text-2xl font-light text-gray-400', className)}>
      {children}
    </div>
  )
}

export default IntroTagline
