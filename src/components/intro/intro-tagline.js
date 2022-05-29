import classNames from 'classnames'
import React from 'react'

function IntroTagline({ children, className }) {
  return (
    <div className={classNames('mt-2 text-2xl font-light text-gray-400', className)}>
      {children}
    </div>
  )
}
export default IntroTagline
