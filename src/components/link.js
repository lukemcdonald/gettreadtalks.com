import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import classnames from 'classnames';

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
export default function Link({
	className,
	activeClassName = 'is-active',
	children,
	to,
	...other
}) {
	// Tailor the following test to your environment.
	// This example assumes that any internal link (intended for Gatsby)
	// will start with exactly one slash, and that anything else is external.
	const internal = /^\/(?!\/)/.test(to);

	// Use Gatsby Link for internal links, and <a> for others
	if (internal) {
		return (
			<GatsbyLink
				to={to}
				className={className}
				activeClassName={activeClassName}
				rel="canonical"
				{...other}
			>
				{children}
			</GatsbyLink>
		);
	}

	return (
		<a className={className} href={to} {...other}>
			{children}
		</a>
	);
}

export function Button({
	className,
	activeClassName = 'is-active',
	children,
	to,
	...other
}) {
	return (
		<Link
			className={classnames(
				'bg-gray-600 rounded py-2 px-4 text-white inline-block hover:shadow-lg transition duration-300',
				className
			)}
			to={to}
			{...other}
		>
			{children}
		</Link>
	);
}
