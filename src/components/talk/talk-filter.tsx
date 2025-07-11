import type { SelectOption } from '../select/select'
import { Select } from '~/components/select'

interface Topic {
  data: {
    talks: readonly any[] | null
    title: string | null
  } | null
  fields: { slug: string | null } | null
  id: string
}

interface Props {
  className?: string
  current: SelectOption
  label?: string
  topics: readonly Topic[]
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
