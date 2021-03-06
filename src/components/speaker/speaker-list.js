import classNames from 'classnames'
import React from 'react'

import SpeakerCard from './speaker-card'

function SpeakerList({ children, className, speakers }) {
  return (
    <div className={classNames('grid gap-4 sm:gap-6 lg:grid lg:grid-cols-2', className)}>
      {children}
      {speakers.map(({ id, fields, data }) => (
        <SpeakerCard key={id} speaker={{ id, ...fields, ...data }} />
      ))}
    </div>
  )
}

export default SpeakerList
