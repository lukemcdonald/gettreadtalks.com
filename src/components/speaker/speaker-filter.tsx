import type { SelectOption } from '~/components/select/select'
import type { TAny } from '~/utils/types/shared'
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

interface SpeakerFilterProp {
  className?: string
  current?: NonNullable<SelectOption>
  label?: string
  speakers: TAny
}

interface SpeakerOption {
  data: {
    firstName: string
    lastName: string
  }
  fields: {
    slug: string
  }
}

function SpeakerFilter({ className, current, label = 'Speakers', speakers }: SpeakerFilterProp) {
  return (
    <Select label={label} className={className} current={current}>
      <Select.Group options={defaultGroupOptions} />

      <Select.Group
        options={speakers.map((speaker: SpeakerOption) => ({
          value: speaker.fields.slug,
          label: `${speaker.data.lastName}, ${speaker.data.firstName}`,
        }))}
      />
    </Select>
  )
}

export default SpeakerFilter
