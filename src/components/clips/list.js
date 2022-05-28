import classNames from 'classnames'
import React from 'react'

import { ClipCard } from '~/components/clips/card'

function ClipsList({ children, className, clips }) {
  return (
    <div className={classNames('grid gap-4 sm:gap-6', className)}>
      {clips.map(({ id, fields, data }) => (
        <ClipCard key={id} clip={{ id, ...fields, ...data }} />
      ))}
      {children}
    </div>
  )
}

export { ClipsList }
