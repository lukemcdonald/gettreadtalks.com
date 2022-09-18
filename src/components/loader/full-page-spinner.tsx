import Spinner from './spinner'

function FullPageSpinner() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner className="h-16 w-16 text-primary-600" />
    </div>
  )
}

export default FullPageSpinner
