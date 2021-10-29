import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/solid'
import { Dialog } from '@headlessui/react'
import { DeactivateForm } from 'components/account/deactivate-form'
import { useAuth } from 'context/auth'
import { useAsync } from 'hooks/async'
import styles from 'components/styles'

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

          <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {buttonText}
            </Dialog.Title>

            <div className="mt-2">
              <p className="text-sm text-gray-500">
                All of your data will be permanently removed and cannot be undone. Enter your password to confirm this
                action.
              </p>
            </div>

            <div className="mt-4">
              <DeactivateForm onSubmit={() => handleOnSubmit()} buttonText="Deactivate my account" />
            </div>

            <div className="absolute top-2 right-2">
              <button
                type="button"
                className={classNames(
                  styles.textButton,
                  'inline-flex justify-center p-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full',
                )}
                onClick={closeModal}
                ref={closeButtonRef}
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

export { DeactivateAccountButton }
