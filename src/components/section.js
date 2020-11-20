import React, { Component } from 'react';
import classnames from 'classnames';
import { sanitizeHTMLTag } from '../utilities';

export function SectionContent({ align, as, children, className }) {
	const Tag = sanitizeHTMLTag(as, [
		'div',
		'article',
		'footer',
		'header',
		'section',
	]);

	const isWide = align === 'wide';

	const columns = {
		start: isWide ? '3' : '4',
		span: isWide ? '8' : '6',
	};

	return (
		<Tag
			className={classnames(
				'py-10 sm:col-span-2 lg:py-16',
				`lg:col-start-${columns.start} lg:col-span-${columns.span}`,
				className
			)}
		>
			{children}
		</Tag>
	);
}

export function SectionSidebar({ children, className, right, sticky }) {
	const padding = right ? 'pl' : 'pr';

	return (
		<div
			className={classnames(
				`border-b border-gray-300 py-10`,
				`sm:border-0`,
				`md:${padding}-6`,
				`lg:${padding}-10 lg:py-16 lg:col-span-3`,
				className
			)}
		>
			<>
				{sticky && <div className="sticky top-10">{children}</div>}
				{!sticky && children}
			</>
		</div>
	);
}

export function SectionHeading({ children, className, as }) {
	const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3']);

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

export default class Intro extends Component {
	static Content = SectionContent;

	static Sidebar = SectionSidebar;

	static Heading = SectionHeading;

	render() {
		const { children, className, separator, as } = this.props;

		const Tag = sanitizeHTMLTag(as, [
			'section',
			'article',
			'div',
			'footer',
			'header',
		]);

		return (
			<Tag className={classnames('', className)}>
				<div
					className={classnames(
						'grid gap-6 sm:grid-cols-3 lg:grid-cols-12 max-w-screen-xl container',
						separator ? 'border-t border-gray-300' : ''
					)}
				>
					{children}
				</div>
			</Tag>
		);
	}
}
