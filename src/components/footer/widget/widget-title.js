import classNames from 'classnames'
import React from 'react'

function WidgetTitle({ className, title }) {
  return (
    <h3
      className={classNames(
        'text-sm font-semibold uppercase tracking-wider text-gray-400',
        className,
      )}
    >
      {title}
    </h3>
  )
}

export default WidgetTitle
