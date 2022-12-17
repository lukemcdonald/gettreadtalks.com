import clsx from 'clsx'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

import styles from '~/utils/styles/form'
import { getErrorMessage } from '~/utils/error'

interface Props {
  error: unknown
}

function FormErrorMessage({ error }: Props) {
  const errorMsg = getErrorMessage(error)

  return (
    <div className={clsx(styles.formError, 'flex items-center')}>
      <ExclamationCircleIcon className="mr-2 h-10 w-10" />
      <p>{errorMsg}</p>
    </div>
  )
}

export { FormErrorMessage }
