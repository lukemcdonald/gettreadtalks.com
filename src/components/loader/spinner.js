import classNames from 'classnames'
import React from 'react'

function Spinner({ className, ...props }) {
  return (
    <div
      className={classNames(
        'my-24 mx-auto h-10 w-10 animate-pulse rounded-full bg-primary-600',
        className,
      )}
      {...props}
    />
  )
}

export default Spinner
