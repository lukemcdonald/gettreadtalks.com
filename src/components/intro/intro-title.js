import classNames from 'classnames'
import React from 'react'

function IntroTitle({ children, className, size }) {
  const sizeMapping = {
    DEFAULT: '',
    large: 'lg:text-5xl lg:leading-tight lg:font-bold',
  }

  return (
    <h1
      className={classNames(
        'text-center text-4xl font-medium text-white',
        sizeMapping[size] || sizeMapping.DEFAULT,
        className,
      )}
    >
      {children}
    </h1>
  )
}

export default IntroTitle
