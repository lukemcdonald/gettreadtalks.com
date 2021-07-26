import React from 'react'
import { navigate } from 'gatsby'

function TopicsFilter(props) {
	const { className, currentTopic, options } = props

	return (
		<div className={className}>
			<Formik
				initialValues={{ optionPath: currentTopic?.to || options[0].to }}
				onSubmit={async (values) => {
					navigate(values.optionPath)
				}}
			>
				{({ handleChange, submitForm }) => (
					<Form>
						<Field
							as="select"
							name="optionPath"
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

export { TopicsFilter }
