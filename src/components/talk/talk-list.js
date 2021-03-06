import classNames from 'classnames'
import React from 'react'

import TalkCard from './talk-card'

function TalkList({ children, className, subtitle, talks }) {
  return (
    <div className={classNames('grid gap-4 sm:gap-6', className)}>
      {talks.map(({ id, fields, data }) => (
        <TalkCard key={id} talk={{ id, ...fields, ...data, subtitle }} />
      ))}
      {children}
    </div>
  )
}

export default TalkList
