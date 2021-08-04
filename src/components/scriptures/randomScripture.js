import React from 'react'

import { Scriptures } from 'components/scriptures/scriptures'
import { Scripture } from 'components/scriptures/scripture'
import { getRandomObjectItem } from 'utils/misc'

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

export { RandomScripture }
