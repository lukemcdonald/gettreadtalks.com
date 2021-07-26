import React, { Component } from 'react'
import classnames from 'classnames'

export const PageTitle = ({ children, className }) => (
	<h1 className={classnames('text-2xl text-gray-900', className)}>
		{children}
	</h1>
)

export default class Page extends Component {
	static Title = PageTitle

	render() {
		const { children, className } = this.props

		return <div className={classnames('', className)}>{children}</div>
	}
}
