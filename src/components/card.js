import React, { Component } from 'react'
import { HiStar as Star } from 'react-icons/hi'
import classNames from 'classnames'
import { Link } from 'components/link'

import { Avatar } from 'components/avatar'
import { sanitizeHTMLTag } from 'utils/misc'

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
			className="w-16 h-16"
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
		<Star className="w-5 h-5" />
	</Link>
)

class Card extends Component {
	static Avatar = CardAvatar

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
