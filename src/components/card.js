import React, { Component } from 'react'
import {
	HeartIcon,
	StarIcon,
	CheckCircleIcon as CheckIcon,
} from '@heroicons/react/outline'
import classNames from 'classnames'

import { sanitizeHTMLTag } from 'utils/misc'

import { Avatar } from 'components/avatar'
import { Link } from 'components/link'

const CardTitle = ({ children, className, as }) => {
	const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3'])

	return (
		<Tag
			className={classNames(
				'text-lg font-bold leading-6 text-gray-900',
				className
			)}
		>
			{children}
		</Tag>
	)
}

const CardSubTitle = ({ children, className, as }) => {
	const Tag = sanitizeHTMLTag(as, ['h2', 'h3'])

	return (
		<Tag
			className={classNames(
				'text-red-600 text-xs tracking-wide uppercase mb-2 mt-1 font-bold leading-none',
				className
			)}
		>
			{children}
		</Tag>
	)
}

const CardMeta = ({ children, className }) => (
	<div
		className={classNames(
			'card__meta',
			'mt-px text-sm text-gray-500 inline-block',
			className
		)}
	>
		{children}
	</div>
)

const CardMetaLink = ({ children, className, to }) => (
	<Link to={to} className={classNames('hover:underline', className)}>
		{children}
	</Link>
)

const CardAvatar = ({ image, alt }) => (
	<figure className="w-16 h-16 mr-4">
		<Avatar
			className="w-16 h-16 rounded-full"
			imgClassName="rounded-full"
			image={image}
			alt={alt}
		/>
	</figure>
)

const CardIcon = ({ className, to, type }) => {
	const iconStyles = 'w-7 h-7 transition-colors p-1'

	return (
		<Link to={to} className={classNames('rounded-full', className)}>
			{type === 'favorite' && (
				<HeartIcon className={classNames(iconStyles, 'hover:text-red-600')} />
			)}
			{type === 'featured' && (
				<StarIcon className={classNames(iconStyles, 'hover:text-gray-600')} />
			)}
			{type === 'finished' && (
				<CheckIcon
					className={classNames(iconStyles, 'hover:text-status-success')}
				/>
			)}
		</Link>
	)
}

const CardIcons = ({ className, icons = [] }) => (
	<div
		className={classNames(
			'absolute z-20 text-gray-300 transition transform top-0 bottom-0 right-0 flex flex-col p-1',
			className
		)}
	>
		{icons.map(({ to, type }, index) => (
			<CardIcon key={index} to={to} type={type} />
		))}
	</div>
)

class Card extends Component {
	static Avatar = CardAvatar

	static Icon = CardIcon

	static Icons = CardIcons

	static Meta = CardMeta

	static MetaLink = CardMetaLink

	static SubTitle = CardSubTitle

	static Title = CardTitle

	render() {
		const {
			children,
			className = '',
			icons = [],
			display = 'boxed',
			hoverStyles = 'true',
		} = this.props

		return (
			<article
				className={classNames(
					'relative flex flex-grow text-left text-gray-700 transition duration-300 border border-transparent rounded',
					className.includes('items-') || 'items-center',
					display === 'boxed' && 'p-4 bg-white shadow-sm',
					hoverStyles === 'true' &&
						'hover:z-10 hover:border-red-600 hover:shadow-lg',
					icons && 'pr-9',
					className
				)}
			>
				{children}

				{icons && <CardIcons icons={icons} />}
			</article>
		)
	}
}

export { Card }
