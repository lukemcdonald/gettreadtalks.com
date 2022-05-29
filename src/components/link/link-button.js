import classNames from 'classnames'
import React from 'react'

import Link from './link'

const LinkButton = ({ className, children, color, size, to, ...props }) => {
  const colorMapping = {
    DEFAULT: 'bg-gray-600 text-white hover:bg-gray-800',
    primary: 'bg-primary-600 text-white hover:bg-gray-800',
  }

  const sizeMapping = {
    DEFAULT: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-xl',
  }

  return (
    <Link
      to={to}
      className={classNames(
        'inline-block rounded-full transition duration-300 hover:shadow-lg',
        colorMapping[color] || colorMapping.DEFAULT,
        sizeMapping[size] || sizeMapping.DEFAULT,
        className,
      )}
      style={{ textDecoration: 'none' }} // Needed when 'prose' typography is applied.
      {...props}
    >
      {children}
    </Link>
  )
}

export default LinkButton
