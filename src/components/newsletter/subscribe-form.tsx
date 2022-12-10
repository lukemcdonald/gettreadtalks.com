import clsx from 'clsx'
import * as Yup from 'yup'
import type { FormikHelpers } from 'formik'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { EnvelopeIcon as EmailIcon } from '@heroicons/react/24/outline'

import formStyles from '~/utils/styles/form'
import styles from '~/utils/styles'
import { FormErrorMessage } from '~/components/account/lib/error-message'
import { useAsync } from '~/hooks/async'
import { useNotification } from '~/context/notifications'

interface FormData {
  email: string
  fields: {
    FNAME: string
    LNAME: string
  }
}

interface Props {
  buttonText: string
  className?: string
  onSubmit: (
    email: FormData['email'],
    fields: FormData['fields'],
  ) => Promise<{ result: string; msg: string }>
  text: string
  title: string
}

function SubscribeForm({ buttonText = 'Notify me', className, onSubmit, text, title }: Props) {
  const { isError, error, run } = useAsync()
  const { notify } = useNotification()

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required.'),
  })

  function handleSubmit(
    values: { email: FormData['email'] },
    actions: FormikHelpers<{ email: FormData['email'] }>,
  ) {
    run(
      onSubmit(values.email, { FNAME: '', LNAME: '' }).then((data) => {
        actions.resetForm({})
        notify({
          title: data.result === 'error' ? 'Error!' : 'Success!',
          text: data.msg,
          icon: ({ className, ...props }) => (
            <EmailIcon
              className={clsx(
                className,
                data.result === 'error' ? 'text-status-error' : 'text-status-success',
              )}
              {...props}
            />
          ),
        })
      }),
    )
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      <p className="mt-4 text-base text-gray-500">{text}</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(v, a) => handleSubmit(v, a)}
      >
        <Form className="mt-4 sm:flex sm:max-w-md">
          {isError ? <FormErrorMessage error={error} /> : null}

          <div className="w-full">
            <label htmlFor="email" className={formStyles.label && 'sr-only'}>
              Email address
            </label>
            <Field
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className={clsx(formStyles.field)}
            />
            <ErrorMessage name="email" component="div" className={formStyles.fieldError} />
          </div>

          <div className="sm:mt-px sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className={clsx(styles.button, 'flex w-full items-center justify-center')}
            >
              {buttonText}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export { SubscribeForm }
