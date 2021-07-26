import React from 'react'

import { getRandomObjectItem } from '../../utilities'

import Scriptures from './scriptures'
import Scripture from './scripture'

function RandomScripture() {
	return (
		<Scriptures>
			{(scriptures) => {
				const scripture = getRandomObjectItem(scriptures)
				return <Scripture scripture={scripture} />
			}}
		</Scriptures>
	)
}

export default RandomScripture
