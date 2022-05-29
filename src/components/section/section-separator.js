import classNames from 'classnames'
import React from 'react'

function SectionSeparator({ className }) {
  return <hr className={classNames('border-gray-300', className)} />
}

export default SectionSeparator
