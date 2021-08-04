import React from 'react'

import { SubNav } from 'components/subNav'

function TalksNav({ title }) {
	const links = [
		{ text: 'All Talks', to: '/talks/' },
		{ text: 'Featured Talks', to: '/talks/featured/' },
	]

	return <SubNav title={title} links={links} />
}

export { TalksNav }
