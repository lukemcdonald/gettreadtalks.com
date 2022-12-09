import classNames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

import styles from '~/utils/styles/form'
import { getErrorMessage } from '~/utils/error'

interface Props {
  error: unknown
}

function FormErrorMessage({ error }: Props) {
  return (
    <div className={classNames(styles.formError, 'flex items-center')}>
      <ExclamationCircleIcon className="mr-2 h-10 w-10" />
      <p>{getErrorMessage(error)}</p>
    </div>
  )
}

export { FormErrorMessage }