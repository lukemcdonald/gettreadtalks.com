import React from 'react'

import { Select } from 'components/select'

function TalksFilter({ className, current, label, topics }) {
	return (
		<Select label={label || 'Talks'} className={className} current={current}>
			<Select.Group
				options={[
					{
						value: '/talks/',
						label: 'All Talks',
					},
					{
						value: '/talks/featured/',
						label: '★ Talks',
					},
				]}
			/>

			<Select.Group
				label="Topics"
				options={topics.map((topic) => ({
					value: topic.fields.slug,
					label: `${topic.data.title} (${topic.data.talks.length})`,
				}))}
			/>
		</Select>
	)
}

export { TalksFilter }
