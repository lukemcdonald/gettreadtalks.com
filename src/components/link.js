import React, { Component } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import classNames from 'classnames'

const LinkButton = ({
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
			className={classNames(
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
		const { children, to, ...other } = this.props

		const internal = /^\/(?!\/)/.test(to)

		if (internal) {
			return (
				<GatsbyLink to={to} rel="canonical" {...other}>
					{children}
				</GatsbyLink>
			)
		}

		return (
			<a href={to} {...other}>
				{children}
			</a>
		)
	}
}

export { Link }
