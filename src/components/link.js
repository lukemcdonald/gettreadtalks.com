import React, { Component } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import classnames from 'classnames'

export const LinkButton = ({
	className,
	activeClassName,
	children,
	color,
	size,
	to,
}) => {
	const colorMapping = {
		DEFAULT: 'bg-gray-600 text-white hover:bg-gray-800',
		primary: 'bg-red-600 text-white hover:bg-gray-800',
	}

	const sizeMapping = {
		DEFAULT: 'py-2 px-4 text-base',
		large: 'py-3 px-6 text-xl',
	}

	return (
		<Link
			to={to}
			activeClassName={activeClassName}
			className={classnames(
				'rounded-full inline-block hover:shadow-lg transition duration-300',
				colorMapping[color] || colorMapping.DEFAULT,
				sizeMapping[size] || sizeMapping.DEFAULT,

				className
			)}
		>
			{children}
		</Link>
	)
}

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
class Link extends Component {
	static Button = LinkButton

	render() {
		const {
			className,
			activeClassName = 'is-active',
			children,
			disabled,
			to,
			target,
			onClick,
		} = this.props

		// Tailor the following test to your environment.
		// This example assumes that any internal link (intended for Gatsby)
		// will start with exactly one slash, and that anything else is external.
		const internal = /^\/(?!\/)/.test(to)

		// Use Gatsby Link for internal links, and <a> for others
		return internal ? (
			<GatsbyLink
				to={!disabled && to}
				className={classnames(className, disabled ? 'opacity-60' : '')}
				activeClassName={activeClassName}
				rel="canonical"
				disabled={disabled}
				onClick={onClick}
			>
				{children}
			</GatsbyLink>
		) : (
			<a className={className} href={to} target={target}>
				{children}
			</a>
		)
	}
}

export { Link }
