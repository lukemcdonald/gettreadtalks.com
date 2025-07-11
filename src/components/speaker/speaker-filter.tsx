import type { SelectOption } from '../select/select'
import { Select } from '~/components/select'

const defaultGroupOptions = [
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
]

interface Speaker {
  data: {
    firstName: string
    lastName: string
    talks: []
  }
  fields: {
    slug: string
  }
  id: string
}

interface Props {
  className?: string
  current: SelectOption
  speakers: any
}

function SpeakerFilter({ className, current, speakers }: Props) {
  return (
    <Select label="Speakers" className={className} current={current}>
      <Select.Group options={defaultGroupOptions} />

      <Select.Group
        options={speakers.map((speaker: Speaker) => ({
          value: speaker.fields.slug,
          label: `${speaker.data.lastName}, ${speaker.data.firstName}`,
        }))}
      />
    </Select>
  )
}

export default SpeakerFilter
