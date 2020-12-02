import React, { Component } from 'react';
import classnames from 'classnames';
import { sanitizeHTMLTag } from '../utilities';

export const SectionContainer = ({ className, children }) => (
	<div className={classnames('container max-w-screen-xl', className)}>
		{children}
	</div>
);

export const SectionContent = ({ align, as, children, className }) => {
	const Tag = sanitizeHTMLTag(as, [
		'div',
		'article',
		'footer',
		'header',
		'section',
	]);

	const alignMapping = {
		DEFUALT: { start: 4, span: 6 },
		wide: { start: 4, span: 9 },
		'wide--center': { start: 2, span: 10 },
		full: { start: 1, span: 12 },
	};

	const columns = alignMapping[align] || alignMapping.DEFUALT;

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
};

export const SectionSidebar = ({ children, className, right, sticky }) => {
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
};

export const SectionHeading = ({ children, className, as }) => {
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
};

export default class Section extends Component {
	static Content = SectionContent;

	static Container = SectionContainer;

	static Sidebar = SectionSidebar;

	static Heading = SectionHeading;

	render() {
		const { as, children, className, separator } = this.props;

		const Tag = sanitizeHTMLTag(as, [
			'section',
			'article',
			'div',
			'footer',
			'header',
		]);

		const separatorMapping = {
			DEFAULT: '',
			top: 'border-t',
			bottom: 'border-b',
			'top-bottom': 'border-t border-b',
		};

		return (
			<Tag className={className}>
				<SectionContainer>
					<div
						className={classnames(
							'grid gap-6 sm:grid-cols-3 lg:grid-cols-12 border-gray-300',
							separatorMapping[separator] || separatorMapping.DEFAULT
						)}
					>
						{children}
					</div>
				</SectionContainer>
			</Tag>
		);
	}
}