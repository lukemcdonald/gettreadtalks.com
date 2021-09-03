import React, { useState } from 'react'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/solid'
import { Dialog } from '@headlessui/react'
import { useAuth } from 'context/auth'
import { useAsync } from 'hooks/async'
import styles from 'components/styles'
import { FormErrorMessage } from 'components/account/lib/error-message'
import { ReauthenticateForm } from 'components/account/reauthenticate-form'

function ReauthenticateDialog({ className, buttonText }) {
	const [isOpen, setIsOpen] = useState(false)
	const { isError, error } = useAsync()
	const { profile, reauthenticate } = useAuth()

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	async function handleOnSubmit(credentials = '') {
		console.log('ReauthenticateDialog', credentials)

		// const credentials = await getCredentials()
		// run()
	}

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className={classNames(styles.button, className)}
			>
				{buttonText}
			</button>

			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				onClose={closeModal}
				open={isOpen}
			>
				<div className="min-h-screen px-4 text-center">
					<Dialog.Overlay className="fixed inset-0 backdrop-blur" />

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
						<Dialog.Title
							as="h3"
							className="text-lg font-medium leading-6 text-gray-900"
						>
							{buttonText || 'Authenticate'}
						</Dialog.Title>

						<div className="mt-2">
							<p className="text-sm text-gray-500">
								Please verify your account.
							</p>
						</div>

						{isError && (
							<div className="my-6">
								<FormErrorMessage error={error} />
							</div>
						)}

						<div className="mt-4">
							<ReauthenticateForm onSubmit={handleOnSubmit} />
						</div>

						<div className="absolute top-2 right-2">
							<button
								type="button"
								className={classNames(
									styles.textButton,
									'inline-flex justify-center p-2 text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-900 rounded-full'
								)}
								onClick={closeModal}
							>
								<XIcon className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	)
}

export { ReauthenticateDialog }