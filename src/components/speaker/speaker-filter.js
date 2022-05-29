import React from 'react'

import { Select } from '~/components/select'

function SpeakerFilter({ className, current, label = 'Speakers', speakers }) {
  return (
    <Select label={label} className={className} current={current}>
      <Select.Group
        options={[
          {
            value: '/speakers/',
            label: 'All Speakers',
          },
          {
            value: '/speakers/featured/',
            label: '★ Speakers',
          },
          {
            separator: true,
          },
        ]}
      />

      <Select.Group
        options={speakers.map((speaker) => ({
          value: speaker.fields.slug,
          label: `${speaker.data.lastName}, ${speaker.data.firstName}`,
        }))}
      />
    </Select>
  )
}

export default SpeakerFilter
