import React from 'react'
import {
	HeartIcon,
	StarIcon,
	CheckCircleIcon as CheckIcon,
} from '@heroicons/react/outline'
import classNames from 'classnames'

import { sanitizeHTMLTag } from 'utils/misc'

import { Avatar } from 'components/avatar'
import { Link } from 'components/link'

function CardTitle({ children, className, as }) {
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

function CardSubTitle({ children, className, as }) {
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

function CardText({ children, className }) {
	return (
		<div
			className={classNames(
				'inline-block mt-px space-x-1 text-sm text-gray-500',
				className
			)}
		>
			{children}
		</div>
	)
}

function CardAvatar({ image, alt }) {
	return (
		<Avatar
			className="flex-shrink-0 w-16 h-16 rounded-full"
			imgClassName="rounded-full"
			image={image}
			alt={alt}
		/>
	)
}

function CardIcon({ className, to, type }) {
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

function CardIcons({ className, icons = [], as }) {
	const Tag = sanitizeHTMLTag(as, ['article', 'div'])

	return (
		<Tag
			className={classNames(
				'absolute z-20 text-gray-300 transition transform top-0 bottom-0 right-0 flex flex-col p-1',
				className
			)}
		>
			{icons.map(({ to, type }, index) => (
				<CardIcon key={index} to={to} type={type} />
			))}
		</Tag>
	)
}

function CardWrapper({ children, className }) {
	return (
		<article
			className={classNames(
				'relative flex items-center flex-grow p-4 space-x-3 text-left text-gray-700 transition duration-300 bg-white border border-transparent rounded shadow-sm',
				'hover:border-red-600 hover:shadow-lg',
				className
			)}
		>
			{children}
		</article>
	)
}

function Card(props) {
	const { avatar, className, icons = [], subtitle, text, title, to } = props

	return (
		<CardWrapper className={classNames(icons && 'pr-9', className)}>
			{avatar && <CardAvatar image={avatar} alt="" />}

			<div className="flex-1 min-w-0">
				<Link to={to} className="focus:outline-none">
					<span className="absolute inset-0 z-0" aria-hidden="true" />
					{subtitle && <CardSubTitle as="h3">{subtitle}</CardSubTitle>}
					{title && <CardTitle as="h2">{title}</CardTitle>}
					{text && <CardText>{text}</CardText>}
				</Link>
			</div>

			{icons && <CardIcons icons={icons} />}
		</CardWrapper>
	)
}

export { Card, CardWrapper, CardAvatar, CardTitle, CardText }
