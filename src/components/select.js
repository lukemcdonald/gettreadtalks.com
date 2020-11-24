import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Field, Form, Formik } from 'formik';
import classnames from 'classnames';

import ConditionalWrapper from './wrapper';
import ChevronRightIcon from '../assets/svgs/icon-chevron-right.svg';

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
		const { children, className, current, label } = this.props;

		return (
			<div className={classnames('relative inline-block', className)}>
				<span>{current.label || label}</span>
				<ChevronRightIcon className="relative inline-block w-8 mb-px -mr-8 transform rotate-90 -right-1" />

				<Formik
					initialValues={{ optionPath: current.value || '' }}
					onSubmit={async (values) => {
						navigate(values.optionPath);
					}}
				>
					{({ handleChange, submitForm }) => (
						<Form className="absolute inset-0 z-50 flex opacity-0 -right-10">
							<Field
								as="select"
								name="optionPath"
								className="flex-grow p-0 bg-transparent border-0 cursor-pointer bg-none "
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
			</div>
		);
	}
}
