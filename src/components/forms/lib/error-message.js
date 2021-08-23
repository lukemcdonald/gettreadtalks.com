import React from 'react'
import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import styles from 'components/styles/form'

function FormErrorMessage({ error }) {
	return (
		<div className={classNames(styles.error, 'flex items-center')}>
			<ExclamationCircleIcon className="w-10 h-10 mr-2" />
			<p>{error.message}</p>
		</div>
	)
}

export { FormErrorMessage }
