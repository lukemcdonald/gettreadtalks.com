import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { Fragment, useState } from 'react'

function Notification({ message = {}, onClose }) {
  const [show, setShow] = useState(true)

  return (
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
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 ">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <message.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className={classNames('w-0 flex-1 pt-0.5', message.icon ? 'ml-3' : 'ml-1')}>
              {message.title && (
                <p className="text-sm font-medium text-gray-900">{message.title}</p>
              )}

              {message.text && (
                <p className={classNames('text-sm text-gray-500', message.title && 'mt-1')}>
                  {message.text}
                </p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="focus:ring-indigo-500 inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => (onClose ? onClose() : setShow(false))}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Notification
