import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import classnames from 'classnames';
import { sanitizeHTMLTag } from '../utilities';

export default function Card({ children, className, ...props }) {
	return (
		<article
			{...props}
			className={classnames(
				'relative flex items-center flex-grow gap-4 p-4 text-gray-700 transition duration-300 bg-white border border-gray-300 rounded hover:z-10 hover:border-red-600 hover:shadow-lg',
				className
			)}
		>
			{children}
		</article>
	);
}

export function Title({ children, className, as }) {
	const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3']);

	return (
		<Tag className={classnames('text-xl font-bold leading-6', className)}>
			{children}
		</Tag>
	);
}

export function SubTitle({ children, className, as }) {
	const Tag = sanitizeHTMLTag(as, ['h2', 'h3']);

	return (
		<Tag
			className={classnames(
				'text-red-600 text-xs tracking-wide uppercase mb-2',
				className
			)}
		>
			{children}
		</Tag>
	);
}

export function Meta({ children, className }) {
	return (
		<div className={classnames('mt-1 text-sm text-gray-500', className)}>
			{children}
		</div>
	);
}

export function MetaLink({ children, className, to }) {
	return (
		<Link
			to={to}
			className={classnames('relative z-50 hover:underline', className)}
		>
			{children}
		</Link>
	);
}

export function Avatar({ data, title }) {
	return (
		<figure className="w-16 h-16">
			{data && (
				<Img
					className="w-16 h-16 rounded-full"
					alt={title}
					fluid={data.localFiles[0].childImageSharp.fluid}
				/>
			)}
		</figure>
	);
}
