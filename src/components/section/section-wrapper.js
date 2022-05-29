import classNames from 'classnames'
import React from 'react'

function SectionWrapper({ className, children }) {
  return <div className={classNames('container max-w-screen-xl', className)}>{children}</div>
}

export default SectionWrapper
