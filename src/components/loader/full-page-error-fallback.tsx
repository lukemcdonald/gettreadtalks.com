import { getErrorMessage } from '~/utils/error'

interface Props {
  error: unknown
}

function FullPageErrorFallback({ error }: Props) {
  const errorMsg = getErrorMessage(error)

  return (
    <div role="alert" className="flex h-screen flex-col items-center justify-center">
      <div>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{errorMsg}</pre>
      </div>
    </div>
  )
}

export default FullPageErrorFallback
