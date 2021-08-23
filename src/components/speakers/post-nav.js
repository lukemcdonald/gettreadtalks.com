import React from 'react'

import { SubNav } from 'components/sub-nav'

function SpeakersPostNav({ data }) {
	const { ministry, website } = data

	const links = [
		{ text: 'All Speakers', to: '/speakers/' },
		{ text: `${ministry}`, to: `${website}` },
	]

	return <SubNav title="Speaker Navigation" links={links} />
}

export { SpeakersPostNav }
