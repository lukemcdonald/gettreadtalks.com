import React from 'react';
import classnames from 'classnames';
import { sanitizeHTMLTag } from '../utilities';

export default function Section({
	children,
	className,
	separator,
	sidebars,
	type,
}) {
	const Tag = sanitizeHTMLTag(type, [
		'section',
		'article',
		'div',
		'footer',
		'header',
	]);

	return (
		<Tag className={classnames('px-4 sm:px-6 ', className)}>
			<div
				className={classnames(
					'grid gap-6 sm:grid-cols-3 lg:grid-cols-12 max-w-screen-xl m-auto',
					separator ? 'border-t border-gray-300' : '',
					sidebars === 2 ? '' : ''
				)}
			>
				{children}
			</div>
		</Tag>
	);
}

export function Heading({ children, className, level }) {
	const Tag = sanitizeHTMLTag(`h${level}`, [
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
	]);

	return (
		<Tag
			className={classnames(
				'mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase lg:mb-2 lg:text-xs',
				className
			)}
		>
			{children}
		</Tag>
	);
}

export function Content({ children, className, type }) {
	const Tag = sanitizeHTMLTag(type, [
		'section',
		'article',
		'div',
		'footer',
		'header',
	]);

	return (
		<Tag
			className={classnames(
				'py-10 lg:py-16 sm:col-span-2 lg:col-span-6 lg:col-start-4',
				className
			)}
		>
			{children}
		</Tag>
	);
}

export function Sidebar({ children, className, right }) {
	const padding = right ? 'pl' : 'pr';

	return (
		<div
			className={classnames(
				`${padding}-6`,
				`lg:${padding}-10`,
				'lg:col-span-3',
				'py-10 lg:py-16',
				className
			)}
		>
			{children}
		</div>
	);
}
