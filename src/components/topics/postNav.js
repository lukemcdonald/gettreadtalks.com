import React from 'react'

import SubNav from '../subNav'

export default function TopicsPostNav() {
	const links = [
		{
			text: '← All Topics',
			to: '/topics/',
		},
	]

	return <SubNav title="Speaker Navigation" links={links} />
}
