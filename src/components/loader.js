import React from 'react'
import classNames from 'classnames'
import { Logo } from 'components/svgs/logo'

function Spinner({ className, ...props }) {
	return (
		<div
			className={classNames(
				'rounded-full w-10 h-10 my-24 mx-auto bg-red-600 animate-pulse',
				className
			)}
			{...props}
		/>
	)
}

function FullPageSpinner() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Spinner className="w-16 h-16 text-red-600" />
		</div>
	)
}

function FullPageLogo() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Logo className="h-10 animate-bounce" />
		</div>
	)
}

function FullPageErrorFallback({ error }) {
	return (
		<div
			role="alert"
			className="flex flex-col items-center justify-center h-screen"
		>
			<p>Uh oh... There's a problem. Try refreshing the app.</p>
			<pre>{error.message}</pre>
		</div>
	)
}

export { Spinner, FullPageLogo, FullPageSpinner, FullPageErrorFallback }
