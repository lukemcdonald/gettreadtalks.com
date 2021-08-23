import React, { Component } from 'react'
import classNames from 'classnames'

const PageTitle = ({ children, className }) => (
	<h1 className={classNames('text-2xl text-gray-900', className)}>
		{children}
	</h1>
)

class Page extends Component {
	static Title = PageTitle

	render() {
		const { children, className } = this.props

		return <div className={className}>{children}</div>
	}
}

export { Page }
