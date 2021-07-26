import React from 'react'
import { TopicCard } from './card'

function Topics({ className, topics }) {
	return (
		<div className={className}>
			{topics.map(({ id, fields, data }) => {
				const topic = { id, ...fields, ...data }
				return <TopicCard key={id} topic={topic} />
			})}
		</div>
	)
}

export { Topics }
