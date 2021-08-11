import React, { Component, useEffect, useState } from 'react'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'
import { HeartIcon, StarIcon } from '@heroicons/react/solid'
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

const CardFeaturedLink = ({ className, to }) => (
	<Link
		to={to}
		className={classNames(
			'absolute z-20 text-gray-700 transition transform hover:text-red-600 rotate-12 -right-2 -top-2 hover:rotate-45',
			className
		)}
	>
		<StarIcon className="w-5 h-5" />
	</Link>
)

const CardFavoriteButton = ({ className, onClick, isFavorite = false }) => {
	const [active, setActive] = useState()

	React.useEffect(() => {
		setActive(isFavorite)
	}, [isFavorite])

	function handleClick() {
		setActive(!active)
		onClick()
	}

	return (
		<button className={className} type="button" onClick={handleClick}>
			{active ? (
				<HeartIcon className="w-full h-full" />
			) : (
				<HeartOutlineIcon className="w-full h-full" />
			)}
		</button>
	)
}

class Card extends Component {
	static Avatar = CardAvatar

	static FavoriteButton = CardFavoriteButton

	static FeaturedLink = CardFeaturedLink

	static Meta = CardMeta

	static MetaLink = CardMetaLink

	static SubTitle = CardSubTitle

	static Title = CardTitle

	render() {
		const { children, className = '' } = this.props

		return (
			<article
				className={classNames(
					'relative flex flex-grow p-4 text-left text-gray-700 transition duration-300 bg-white border border-transparent rounded shadow-sm hover:z-10 hover:border-red-600 hover:shadow-lg',
					className.includes('items-') || 'items-center',
					className
				)}
			>
				{children}
			</article>
		)
	}
}

export { Card }
