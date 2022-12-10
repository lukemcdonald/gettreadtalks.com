import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
  size?: 'large'
}

function mapSizeToClassName(size: Props['size']) {
  const values = {
    large: 'lg:text-5xl lg:leading-tight lg:font-bold',
  }
  return size ? values[size] : ''
}

function IntroTitle({ children, className, size }: Props) {
  return (
    <h1
      className={clsx(
        'text-center text-4xl font-medium text-white',
        mapSizeToClassName(size),
        className,
      )}
    >
      {children}
    </h1>
  )
}

export default IntroTitle
