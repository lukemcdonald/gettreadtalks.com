import React from 'react'
import { useForm } from '../../utilities/useForm'

function TopicsFilter({ className, topics }) {
	const options = [
		{
			text: 'All Topics',
			to: '/talks/',
		},
	]

	topics.map((topic) =>
		options.push({
			text: topic.data.title,
			to: topic.fields.slug,
		})
	)

	const { values, updateValue } = useForm({
		topicPath: options[0].to,
	})

	return (
		<form className={className}>
			<fieldset>
				<legend className="font-bold">Choose a topic:</legend>
				<select
					name="topicPath"
					onChange={(e) => {
						updateValue()
					}}
				>
					{options.map((option) => (
						<option key={option.text} value={option.to}>
							{option.text}
						</option>
					))}
				</select>
			</fieldset>
		</form>
	)
}

export { TopicsFilter }
