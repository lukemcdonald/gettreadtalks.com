import React, { Component } from 'react'
import classNames from 'classnames'
import { sanitizeHTMLTag } from 'utils/misc'

const SectionContainer = ({ className, children }) => (
	<div className={classNames('container max-w-screen-xl', className)}>
		{children}
	</div>
)

const SectionContent = ({ align, as, children, className }) => {
	const Tag = sanitizeHTMLTag(as, [
		'div',
		'article',
		'footer',
		'header',
		'section',
	])

	const alignMapping = {
		DEFUALT: { start: 'lg:col-start-4', span: 'lg:col-span-6' },
		wide: { start: 'lg:col-start-4', span: 'lg:col-span-9' },
		'wide--center': { start: 'lg:col-start-2', span: 'lg:col-span-10' },
		full: { start: 'lg:col-start-1', span: 'lg:col-span-12' },
	}

	const columns = alignMapping[align] || alignMapping.DEFUALT

	return (
		<Tag
			className={classNames(
				'py-6 sm:col-span-2 lg:py-16',
				`${columns.start} ${columns.span}`,
				className
			)}
		>
			{children}
		</Tag>
	)
}

const SectionSidebar = ({ children, className, right, sticky }) => (
	<div
		className={classNames(
			`pt-6 sm:py-6`,
			`sm:border-0`,
			right ? 'md:pl-6 lg:pl-10' : 'md:pr-6 lg:pr-10',
			`lg:py-16 lg:col-span-3`,
			className
		)}
	>
		<>
			{sticky && <div className="sticky top-10">{children}</div>}
			{!sticky && children}
		</>
	</div>
)

const SectionHeading = ({ children, className = '', as }) => {
	const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3'])

	return (
		<Tag
			className={classNames(
				'mb-3 text-sm font-bold tracking-wide  uppercase lg:mb-2 lg:text-xs',
				className.includes('text-gray-') || 'text-gray-500',
				className
			)}
		>
			{children}
		</Tag>
	)
}

const SectionSeparator = ({ className }) => (
	<hr className={classNames('border-gray-300', className)} />
)

class Section extends Component {
	static Content = SectionContent

	static Container = SectionContainer

	static Sidebar = SectionSidebar

	static Heading = SectionHeading

	static Separator = SectionSeparator

	render() {
		const { as, children, className, separator, separatorClass } = this.props

		const Tag = sanitizeHTMLTag(as, [
			'section',
			'article',
			'div',
			'footer',
			'header',
		])

		return (
			<Tag className={className}>
				<SectionContainer>
					{(separator === 'top' || separator === 'top-bottom') && (
						<SectionSeparator className={classNames(separatorClass)} />
					)}
					<div className="grid sm:gap-6 sm:grid-cols-3 lg:grid-cols-12">
						{children}
					</div>
					{(separator === 'bottom' || separator === 'top-bottom') && (
						<SectionSeparator className={classNames(separatorClass)} />
					)}
				</SectionContainer>
			</Tag>
		)
	}
}

export { Section }
