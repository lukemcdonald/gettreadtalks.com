import { Dialog } from '@headlessui/react'
import { XMarkIcon as CloseIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'

import { DeactivateForm } from '~/components/account/deactivate-form'
import styles from '~/components/styles'
import { useAuth } from '~/context/auth'
import { useAsync } from '~/hooks/async'

function DeactivateAccountButton({ className, buttonText = 'Deactivate' }) {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const { unregister } = useAuth()
  const { run } = useAsync()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleOnSubmit(form) {
    run(unregister(form))
  }

  return (
    <>
      <button type="button" onClick={openModal} className={classNames(styles.button, className)}>
        {buttonText}
      </button>

      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => closeModal()}
        initialFocus={closeButtonRef}
        open={isOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-gray-100 bg-opacity-90" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="relative my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {buttonText}
            </Dialog.Title>

            <div className="mt-2">
              <p className="text-sm text-gray-500">
                All of your data will be permanently removed and cannot be undone. Enter your
                password to confirm this action.
              </p>
            </div>

            <div className="mt-4">
              <DeactivateForm
                onSubmit={() => handleOnSubmit()}
                buttonText="Deactivate my account"
              />
            </div>

            <div className="absolute top-2 right-2">
              <button
                type="button"
                className={classNames(
                  styles.textButton,
                  'inline-flex justify-center rounded-full bg-gray-100 p-2 text-gray-700 hover:bg-gray-200',
                )}
                onClick={closeModal}
                ref={closeButtonRef}
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export { DeactivateAccountButton }
