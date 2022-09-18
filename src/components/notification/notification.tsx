import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/solid'

type IconProps = React.ComponentProps<'svg'> & {
  className?: string
}

export interface NotificationMessage {
  icon: (props: IconProps) => JSX.Element
  id?: number
  text: string
  title: string
}

interface Props {
  message: NotificationMessage
  onClose: () => void
}

function Notification({ message, onClose }: Props) {
  const [show, setShow] = useState(true)
  const MessageIcon = message.icon

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
              <MessageIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div
              className={classNames(
                'w-0 flex-1 pt-0.5',
                message.icon !== undefined ? 'ml-3' : 'ml-1',
              )}
            >
              {message.title ? (
                <p className="text-sm font-medium text-gray-900">{message.title}</p>
              ) : null}

              {message.text ? (
                <p className={classNames('text-sm text-gray-500', message.title && 'mt-1')}>
                  {message.text}
                </p>
              ) : null}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="focus:ring-indigo-500 inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => (onClose ? onClose() : setShow(false))}
              >
                <span className="sr-only">Close</span>
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Notification
