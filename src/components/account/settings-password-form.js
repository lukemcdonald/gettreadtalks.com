import React, { useState } from 'react'
import { ErrorMessage, Formik, Field, Form } from 'formik'
import { FormErrorMessage } from 'components/account/lib/error-message'
import { useAsync } from 'hooks/async'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import styles from 'components/styles'
import formStyles from 'components/styles/form'
import { useAuth } from 'context/auth'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from 'components/toggle'

function SettingsPasswordForm({ className, buttonText, onSubmit }) {
	const { isError, error, run } = useAsync()
	const { profile } = useAuth()
	const [showPassword, setShowPassword] = useState(false)

	const initialValues = {
		password: '',
		newPassword: '',
	}

	function handleSubmit(values) {
		const credentials = {
			email: profile.email,
			password: values.password,
		}

		const updates = {
			newPassword: values.newPassword,
		}

		run(onSubmit({ credentials, updates }))
	}

	function validate(values) {
		const errors = {}

		if (!values.password) {
			errors.password = 'Your current account password is required.'
		}

		if (!values.newPassword) {
			errors.newPassword = 'New password cannot be empty.'
		}

		return errors
	}

	function toggleShowPassword() {
		console.log(showPassword)
		setShowPassword(!showPassword)
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
					<label htmlFor="password" className={formStyles.label}>
						Current Password
					</label>

					<Field name="password" type="password" className={formStyles.field} />

					<ErrorMessage
						name="password"
						component="div"
						className={formStyles.fieldError}
					/>
				</div>

				<div className={formStyles.formRow}>
					<label htmlFor="newPassword" className={formStyles.label}>
						New password
					</label>

					{/* <Field
						name="newPassword"
						type="password"
						className={formStyles.field}
					/> */}

					<Field name="newPassword">
						{({ field }) => (
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									className={formStyles.field}
									{...field}
								/>
								<Toggle>
									<ToggleButton
										checked={showPassword}
										onChange={toggleShowPassword}
										className="absolute top-0 bottom-0 right-0 p-2 text-gray-400 transition-colors border-l border-gray-300 w-9 hover:text-gray-600"
									>
										<ToggleOff>
											<span className="sr-only">Show password</span>
											<EyeIcon className="w-full h-full" />
										</ToggleOff>
										<ToggleOn>
											<span className="sr-only">Hide password</span>
											<EyeOffIcon className="w-full h-full text-gray-600" />
										</ToggleOn>
									</ToggleButton>
								</Toggle>
							</div>
						)}
					</Field>

					<ErrorMessage
						name="newPassword"
						component="div"
						className={formStyles.fieldError}
					/>
				</div>

				<div className={formStyles.formRow}>
					<button type="submit" className={styles.button}>
						{buttonText || 'Submit'}
					</button>
				</div>
			</Form>
		</Formik>
	)
}

export { SettingsPasswordForm }
