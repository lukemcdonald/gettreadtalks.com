import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Field, Form, Formik } from 'formik';

const ConditionalWrapper = ({ condition, wrapper, children }) =>
	condition ? wrapper(children) : children;

export const SelectGroup = ({ label, options }) => (
	<ConditionalWrapper
		condition={label}
		wrapper={(children) => <optgroup label={label}>{children}</optgroup>}
	>
		{options.map(({ label: text, value }) => (
			<option key={text} value={value}>
				{text}
			</option>
		))}
	</ConditionalWrapper>
);

export default class Select extends Component {
	static Group = SelectGroup;

	render() {
		const { children, className, current } = this.props;

		return (
			<Formik
				initialValues={{ optionPath: current || '' }}
				onSubmit={async (values) => {
					navigate(values.optionPath);
				}}
			>
				{({ handleChange, submitForm }) => (
					<Form className={className}>
						<Field
							as="select"
							name="optionPath"
							className="p-0 text-2xl bg-transparent border-0 cursor-pointer bg-none"
							onChange={(e) => {
								handleChange(e);
								submitForm();
							}}
						>
							{children}
						</Field>
					</Form>
				)}
			</Formik>
		);
	}
}
