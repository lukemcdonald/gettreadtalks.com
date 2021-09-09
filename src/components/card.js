import React from 'react'
import { HeartIcon, StarIcon, CheckIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

import { sanitizeHTMLTag } from 'utils/misc'

import { Image } from 'components/image'
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

function CardIcon({ className, to, type }) {
	const icons = {
		favorite: {
			title: 'Favorite',
			icon: HeartIcon,
			style: 'text-favorite-700 bg-favorite-100 hover:bg-favorite-200',
			to: to || '/account/favorites/',
		},
		featured: {
			title: 'Featured',
			icon: StarIcon,
			style: 'text-featured-700 bg-featured-100 hover:bg-featured-200',
			to: to || '/talks/featured/',
		},
		finished: {
			title: 'Finished',
			icon: CheckIcon,
			style: 'text-finished-700 bg-finished-100 hover:bg-finished-200',
			to: to || '/account/finished/',
		},
	}

	const item = icons[type]

	return (
		<Link to={item.to} className={classNames('rounded-full', className)}>
			<span
				className={classNames(
					'flex items-center pl-1 pr-1.5 py-0.5 text-xs font-medium rounded-full space-x-1',
					item.style
				)}
			>
				<item.icon className="w-3.5 h-3.5 transition-colors" />
				<span>{item.title}</span>
			</span>
		</Link>
	)
}

function CardIcons({ className, icons = [], as }) {
	const Tag = sanitizeHTMLTag(as, ['div', 'span'])
	let filteredIcons = icons

	if (icons.includes('favorite') && icons.includes('featured')) {
		filteredIcons = icons.filter((item) => item !== 'featured')
	}

	return (
		<Tag className={className}>
			{filteredIcons.map((type, index) => (
				<CardIcon key={index} type={type} />
			))}
		</Tag>
	)
}

function CardWrapper({ children, className }) {
	return (
		<article
			className={classNames(
				'relative flex items-center flex-grow p-4 space-x-3 text-left text-gray-700 transition duration-300 bg-white rounded shadow-sm',
				'ring-2 ring-transparent hover:ring-white',
				'hover:shadow-lg',
				className
			)}
		>
			{children}
		</article>
	)
}

function CardImage({ className, image, alt, ...props }) {
	return (
		<>
			{image && (
				<Image
					image={image}
					className={classNames(
						'flex-shrink-0',
						className || 'w-16 h-16 rounded-full'
					)}
					{...props}
				/>
			)}
		</>
	)
}

function CardContent({ to, icons = [], subtitle, title, text }) {
	return (
		<div className="items-center flex-1 min-w-0">
			<Link to={to} className="focus:outline-none">
				<span className="absolute inset-0 z-0" aria-hidden="true" />
				{subtitle && <CardSubTitle as="h3">{subtitle}</CardSubTitle>}
				{title && (
					<CardTitle as="h2">
						<span className={classNames('inline', icons.length > 0 && 'mr-2')}>
							{title}
						</span>
						{icons?.length > 0 && (
							<CardIcons
								className="relative z-10 inline-flex space-x-2 top-px"
								icons={icons}
							/>
						)}
					</CardTitle>
				)}
				{text && <CardText>{text}</CardText>}
			</Link>
		</div>
	)
}

function Card(props) {
	const {
		image,
		imageAlt,
		className,
		icons,
		subtitle,
		text,
		title,
		to,
		children,
	} = props

	return (
		<CardWrapper className={className}>
			<CardImage image={image} alt={imageAlt} />

			<CardContent
				to={to}
				icons={icons}
				subtitle={subtitle}
				title={title}
				text={text}
			/>

			{children}
		</CardWrapper>
	)
}

export { Card, CardWrapper, CardImage, CardContent, CardTitle, CardText }
