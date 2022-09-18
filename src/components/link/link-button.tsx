import React from 'react'
import classNames from 'classnames'
import type { TAny } from '~/utils/types/shared'

import Link from './link'
interface Props {
  children: React.ReactNode
  className?: string
  color?: keyof typeof colorClassMap
  size?: keyof typeof sizeClassMap
  to: string
  [key: string]: TAny
}

const colorClassMap = {
  DEFAULT: 'bg-gray-600 text-white hover:bg-gray-800',
  primary: 'bg-primary-600 text-white hover:bg-gray-800',
} as const

const sizeClassMap = {
  DEFAULT: 'py-2 px-4 text-base',
  large: 'py-3 px-6 text-xl',
} as const

function LinkButton({
  children,
  className,
  color = 'DEFAULT',
  size = 'DEFAULT',
  to,
  ...props
}: Props) {
  return (
    <Link
      className={classNames(
        'inline-block rounded-full transition duration-300 hover:shadow-lg',
        colorClassMap[color],
        sizeClassMap[size],
        className,
      )}
      style={{ textDecoration: 'none' }} // Needed when 'prose' typography is applied.
      to={to}
      {...props}
    >
      {children}
    </Link>
  )
}

export default LinkButton
