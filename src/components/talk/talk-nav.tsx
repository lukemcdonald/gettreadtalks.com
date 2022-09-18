import { SubNav } from '~/components/sub-nav'

interface Props {
  title?: string
}

const links = [
  { name: 'All Talks', to: '/talks/' },
  { name: 'Featured Talks', to: '/talks/featured/' },
]

function TalkNav({ title }: Props) {
  return <SubNav title={title} links={links} />
}

export default TalkNav
