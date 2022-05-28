import classNames from 'classnames'
import React from 'react'

import { Logo } from '~/components/svgs/logo'

export function Spinner({ className, ...props }) {
  return (
    <div
      className={classNames(
        'my-24 mx-auto h-10 w-10 animate-pulse rounded-full bg-primary-600',
        className,
      )}
      {...props}
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner className="h-16 w-16 text-primary-600" />
    </div>
  )
}

export function FullPageLogo() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Logo className="h-10 animate-bounce" />
    </div>
  )
}

export function ErrorFallback({ error }) {
  return (
    <div>
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export function FullPageErrorFallback({ error }) {
  return (
    <div role="alert" className="flex h-screen flex-col items-center justify-center">
      <ErrorFallback error={error} />
    </div>
  )
}
