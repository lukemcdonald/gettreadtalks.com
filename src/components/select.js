import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { Field, Form, Formik } from 'formik'
import classNames from 'classnames'
import { HiChevronDown as ChevronDown } from 'react-icons/hi'

import { ConditionalWrapper } from './conditionalWrapper'

const SelectGroup = ({ label, options }) => (
	<ConditionalWrapper
		condition={label}
		wrapper={(children) => <optgroup label={label}>{children}</optgroup>}
	>
		{options.map(({ label: text, value, separator, index }) =>
			separator ? (
				<option key={`${separator}-${index}`} disabled>
					{typeof separator === 'boolean' ? `─` : separator}
				</option>
			) : (
				<option key={`${value}`} value={value}>
					{text}
				</option>
			)
		)}
	</ConditionalWrapper>
)

class Select extends Component {
	static Group = SelectGroup

	render() {
		const { children, className, current, label } = this.props

		return (
			<div className={classNames('relative inline-block', className)}>
				<span>{current.label || label}</span>
				<ChevronDown className="relative inline-block w-8 mb-px -mr-8" />

				<Formik
					initialValues={{ optionPath: current.value || '' }}
					onSubmit={async (values) => {
						navigate(values.optionPath)
					}}
				>
					{({ handleChange, submitForm }) => (
						<Form className="absolute inset-0 z-40 flex overflow-hidden opacity-0 -right-10">
							<Field
								as="select"
								name="optionPath"
								className="flex-grow p-0 bg-transparent border-0 cursor-pointer bg-none "
								onChange={(e) => {
									handleChange(e)
									submitForm()
								}}
							>
								{children}
							</Field>
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}

export { Select }
