import React from 'react'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

function SectionWrapper({ className, children }: Props) {
  return <div className={classNames('container max-w-screen-xl', className)}>{children}</div>
}

export default SectionWrapper
