import classNames from 'classnames'
import React from 'react'

function SectionSeparator({ className }) {
  return <hr className={classNames('border-gray-700', className)} />
}

export default SectionSeparator
