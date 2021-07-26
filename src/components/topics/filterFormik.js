import React from 'react'
import { navigate } from 'gatsby'
import { Field, Form, Formik } from 'formik'

const ConditionalWrapper = ({ condition, wrapper, children }) =>
	condition ? wrapper(children) : children

export default function TopicsFilter(props) {
	const { className, currentTopic, topics, label } = props

	const options = []

	topics.map((topic) =>
		options.push({
			text: topic.data.title,
			to: topic.fields.slug,
		})
	)

	return (
		<div className={className}>
			<Formik
				initialValues={{ topicPath: currentTopic?.to || options[0].to }}
				onSubmit={async (values) => {
					navigate(values.topicPath)
				}}
			>
				{({ handleChange, submitForm }) => (
					<Form>
						<Field
							as="select"
							name="topicPath"
							className="inline p-0 text-2xl bg-transparent border-none rounded cursor-pointer bg-none"
							onChange={(e) => {
								handleChange(e)
								submitForm()
							}}
						>
							{options.map((option) => (
								<ConditionalWrapper
									condition={option?.label}
									wrapper={(children) => (
										<optgroup label={option.label}>{children}</optgroup>
									)}
								>
									{option.text && option.to && (
										<option key={option.text} value={option.to}>
											{option.text}
										</option>
									)}
								</ConditionalWrapper>
							))}
						</Field>
					</Form>
				)}
			</Formik>
		</div>
	)
}
