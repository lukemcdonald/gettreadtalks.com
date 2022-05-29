import classNames from 'classnames'
import React from 'react'

function CardText({ children, className }) {
  return (
    <div className={classNames('mt-px inline-block space-x-1 text-sm text-gray-500', className)}>
      {children}
    </div>
  )
}
export default CardText
