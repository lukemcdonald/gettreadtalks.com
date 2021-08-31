import React, { useState } from 'react'
import classNames from 'classnames'
import { ErrorMessage, Formik, Field, Form } from 'formik'
import { FormErrorMessage } from 'components/account/lib/error-message'
import { useAsync } from 'hooks/async'

import styles from 'components/styles'
import formStyles from 'components/styles/form'
import { useAuth } from 'context/auth'

function SettingsEmailForm({ className, buttonText, onSubmit }) {
	const { isError, error, run } = useAsync()
	const { profile } = useAuth()
	const [isAccountEmail, setIsAccountEmail] = useState(!!profile?.email)

	const initialValues = {
		email: profile?.email || '',
		password: '',
	}

	function handleSubmit(values) {
		const credentials = {
			email: profile.email,
			password: values.password,
		}

		const updates = {
			email: values.email,
		}

		run(onSubmit({ credentials, updates }))
	}

	function validate(values) {
		const errors = {}

		if (!values.email) {
			errors.email = 'Email address cannot be empty.'
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address.'
		} else {
			setIsAccountEmail(values.email === profile.email)
		}

		if (!values.password) {
			errors.password = 'Your account password is required.'
		}

		return errors
	}

	return (
		<Formik
			initialValues={initialValues}
			mapPropsToErrors={(props) => console.log(props)}
			validate={validate}
			onSubmit={handleSubmit}
		>
			<Form className={className}>
				{isError && <FormErrorMessage error={error} />}

				<div className={formStyles.formRow}>
					<label htmlFor="email" className={formStyles.label && 'hidden'}>
						Email address
					</label>

					<Field name="email" type="email" className={formStyles.field} />
					<ErrorMessage
						name="email"
						component="div"
						className={formStyles.fieldError}
					/>
				</div>

				{!isAccountEmail && (
					<>
						<div className={formStyles.formRow}>
							<label htmlFor="password" className={formStyles.label}>
								Password
							</label>
							<Field
								name="password"
								type="password"
								className={formStyles.field}
							/>

							<p className={formStyles.fieldNote}>
								Enter your account password to approve this change.
							</p>

							<ErrorMessage
								name="password"
								component="div"
								className={formStyles.fieldError}
							/>
						</div>
						<div className={formStyles.formRow}>
							<button type="submit" className={styles.button}>
								{buttonText || 'Submit'}
							</button>
						</div>
					</>
				)}
			</Form>
		</Formik>
	)
}

export { SettingsEmailForm }
