import classNames from 'classnames'
import React from 'react'

import ClipCard from './clip-card'

function ClipList({ children, className, clips }) {
  return (
    <div className={classNames('grid gap-4 sm:gap-6', className)}>
      {clips.map(({ id, fields, data }) => (
        <ClipCard key={id} clip={{ id, ...fields, ...data }} />
      ))}
      {children}
    </div>
  )
}

export default ClipList
