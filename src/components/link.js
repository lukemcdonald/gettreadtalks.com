import React, { Component } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import classnames from 'classnames';

export const LinkButton = ({ className, activeClassName, children, to }) => (
	<Link
		to={to}
		activeClassName={activeClassName}
		className={classnames(
			'bg-gray-600 rounded py-2 px-4 text-white inline-block hover:shadow-lg transition duration-300',
			className
		)}
	>
		{children}
	</Link>
);

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
export default class Link extends Component {
	static Button = LinkButton;

	render() {
		const {
			className,
			activeClassName = 'is-active',
			children,
			disabled,
			to,
			target,
		} = this.props;

		// Tailor the following test to your environment.
		// This example assumes that any internal link (intended for Gatsby)
		// will start with exactly one slash, and that anything else is external.
		const internal = /^\/(?!\/)/.test(to);

		// Use Gatsby Link for internal links, and <a> for others
		return internal ? (
			<GatsbyLink
				to={!disabled && to}
				className={classnames(className, disabled ? 'opacity-60' : '')}
				activeClassName={activeClassName}
				rel="canonical"
				disabled={disabled}
			>
				{children}
			</GatsbyLink>
		) : (
			<a className={className} href={to} target={target}>
				{children}
			</a>
		);
	}
}
