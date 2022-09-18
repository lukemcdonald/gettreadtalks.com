import React from 'react'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

function CardWrapper({ children, className }: Props) {
  return (
    <article
      className={classNames(
        'relative flex flex-grow space-x-3 rounded bg-white p-4 text-left text-gray-700 shadow-sm transition duration-300 def:items-center',
        'ring-2 ring-transparent hover:ring-white',
        'hover:shadow-lg',
        className,
      )}
    >
      {children}
    </article>
  )
}

export default CardWrapper
