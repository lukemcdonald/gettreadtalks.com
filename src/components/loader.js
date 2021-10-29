import React from 'react'
import classNames from 'classnames'
import { Logo } from 'components/svgs/logo'

export function Spinner({ className, ...props }) {
  return (
    <div
      className={classNames('rounded-full w-10 h-10 my-24 mx-auto bg-primary-600 animate-pulse', className)}
      {...props}
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner className="w-16 h-16 text-primary-600" />
    </div>
  )
}

export function FullPageLogo() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
    <div role="alert" className="flex flex-col items-center justify-center h-screen">
      <ErrorFallback error={error} />
    </div>
  )
}
