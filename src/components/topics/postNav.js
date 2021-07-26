import React from 'react'

import SubNav from '../subNav'

function TopicsPostNav() {
	const links = [
		{
			text: '← All Topics',
			to: '/topics/',
		},
	]

	return <SubNav title="Speaker Navigation" links={links} />
}

export default TopicsPostNav
