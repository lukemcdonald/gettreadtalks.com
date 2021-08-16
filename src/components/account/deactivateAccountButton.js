import React, { Fragment, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { DeactivateAccountForm } from 'components/forms/deactivate'
import { useAuth } from 'context/auth'
import { useUsers } from 'context/users'
import { useAsync } from 'hooks/useAsync'

function DeactivateAccountButton({ id }) {
	const [isOpen, setIsOpen] = useState(false)
	const { unregister } = useAuth()
	const { deleteUserById } = useUsers()
	const { run } = useAsync()

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}

	function handleOnSubmit(form) {
		run(unregister(form))
		run(deleteUserById(id))
	}

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				Deactivate Account
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 backdrop-blur filter grayscale" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Deactivate Account
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										All of your data will be permanently removed and cannot be
										undone. Enter your password to confirm this action.
									</p>
								</div>

								<div className="mt-4">
									<DeactivateAccountForm
										onSubmit={handleOnSubmit}
										buttonText="Deactivate my account"
									/>
								</div>

								<div className="absolute top-2 right-2">
									<button
										type="button"
										className="inline-flex justify-center p-1 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
										onClick={closeModal}
									>
										<XIcon className="w-4 h-4" />
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export { DeactivateAccountButton }
