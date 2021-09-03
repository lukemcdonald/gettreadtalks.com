import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

function Notification({ message = {}, onClose }) {
	const [show, setShow] = useState(true)

	return (
		<>
			<Transition
				show={show}
				as={Fragment}
				enter="transform ease-out duration-300 transition"
				enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
				enterTo="translate-y-0 opacity-100 sm:translate-x-0"
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ">
					<div className="p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								{message.icon && (
									<message.icon.name
										className={classNames('w-6 h-6', message.icon?.className)}
										aria-hidden="true"
									/>
								)}
							</div>
							<div
								className={classNames(
									'w-0 flex-1 pt-0.5',
									message.icon ? 'ml-3' : 'ml-1'
								)}
							>
								{message.title && (
									<p className="text-sm font-medium text-gray-900">
										{message.title}
									</p>
								)}

								{message.description && (
									<p
										className={classNames(
											'text-sm text-gray-500',
											message.title && 'mt-1'
										)}
									>
										{message.description}
									</p>
								)}
							</div>
							<div className="flex flex-shrink-0 ml-4">
								<button
									type="button"
									className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={() => (onClose ? onClose() : setShow(false))}
								>
									<span className="sr-only">Close</span>
									<XIcon className="w-5 h-5" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</>
	)
}

export { Notification }
