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
				'py-6 sm:col-span-2 lg:py-16',
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
				`pt-6 sm:py-6`,
				// 'border-b border-gray-300',
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

export const SectionHeading = ({ children, className = '', as }) => {
	const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3']);

	return (
		<Tag
			className={classnames(
				'mb-3 text-sm font-bold tracking-wide  uppercase lg:mb-2 lg:text-xs',
				className.includes('text-gray-') || 'text-gray-500',
				className
			)}
		>
			{children}
		</Tag>
	);
};

export const SectionSeparator = ({ className }) => (
	<hr className={classnames('border-gray-300 hidden', className)} />
);

export default class Section extends Component {
	static Content = SectionContent;

	static Container = SectionContainer;

	static Sidebar = SectionSidebar;

	static Heading = SectionHeading;

	static Separator = SectionSeparator;

	render() {
		const { as, children, className, separator, separatorClass } = this.props;

		const Tag = sanitizeHTMLTag(as, [
			'section',
			'article',
			'div',
			'footer',
			'header',
		]);

		return (
			<Tag className={className}>
				<SectionContainer>
					{(separator === 'top' || separator === 'top-bottom') && (
						<SectionSeparator className={classnames(separatorClass)} />
					)}
					<div className="grid sm:gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-12">
						{children}
					</div>
					{(separator === 'bottom' || separator === 'top-bottom') && (
						<SectionSeparator className={classnames(separatorClass)} />
					)}
				</SectionContainer>
			</Tag>
		);
	}
}
