import type { SelectOption } from '../select/select'
import type { TAny } from '~/utils/types/shared'
import { Select } from '~/components/select'

interface Topic {
  data: {
    talks: []
    title: string
  }
  fields: { slug: string }
  id: string
}

interface Props {
  className?: string
  current: SelectOption
  label?: string
  topics: TAny
}

const mainOptions = [
  { label: 'All Talks', value: '/talks/' },
  { label: '★ Talks', value: '/talks/featured/' },
]

function TalkFilter({ className, current, label, topics }: Props) {
  const topicOptions = topics.map(
    (topic: Topic): SelectOption => ({
      value: topic?.fields?.slug || '',
      label: `${topic?.data?.title} (${topic?.data?.talks?.length})`,
    }),
  )

  return (
    <Select label={label || 'Talks'} className={className} current={current}>
      <Select.Group options={mainOptions} />
      {topicOptions ? <Select.Group options={topicOptions} label="Topics" /> : null}
    </Select>
  )
}

export default TalkFilter
