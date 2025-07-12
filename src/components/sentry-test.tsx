import { captureException } from '../../sentry.config'

export function SentryTestButton({
  errorMessage = 'Test Sentry error!',
  options,
}: {
  errorMessage?: string
  options?: Record<string, any>
}) {
  return (
    <div className="flex flex-col gap-2 m-2">
      <button
        className="bg-primary-500 text-white px-4 py-2 rounded-md"
        onClick={() =>
          captureException(new Error(errorMessage), {
            ...options,
          })
        }
      >
        Send Test Error to Sentry
      </button>
      <code>{errorMessage}</code>
    </div>
  )
}
