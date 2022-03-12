import React from 'react'
import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import styles from 'components/styles/form'

function FormErrorMessage({ error }) {
  return (
    <div className={classNames(styles.formError, 'flex items-center')}>
      <ExclamationCircleIcon className="mr-2 h-10 w-10" />
      <p>{error.message}</p>
    </div>
  )
}

export { FormErrorMessage }
