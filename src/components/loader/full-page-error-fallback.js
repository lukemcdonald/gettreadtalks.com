import React from 'react'

function FullPageErrorFallback({ error }) {
  return (
    <div role="alert" className="flex h-screen flex-col items-center justify-center">
      <div>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    </div>
  )
}

export default FullPageErrorFallback
