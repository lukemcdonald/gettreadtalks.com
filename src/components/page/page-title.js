import classNames from 'classnames'
import React from 'react'

function PageTitle({ children, className }) {
  return <h1 className={classNames('text-2xl text-gray-900', className)}>{children}</h1>
}

export default PageTitle
