import classNames from 'classnames'
import React from 'react'

function Page({ children, className }) {
  return <div className={className}>{children}</div>
}

export const PageTitle = ({ children, className }) => (
  <h1 className={classNames('text-2xl text-gray-900', className)}>{children}</h1>
)

export default Object.assign(Page, {
  Title: PageTitle,
})
