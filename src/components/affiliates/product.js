import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import classNames from 'classnames'

import { Card } from '../card'
import { Disclosure } from './disclosure'
import { FauxLink } from '../fauxLink'

function Product(props) {
	const { data: post, className } = props

	return (
		<Card className="relative border-none rounded">
			<div className={classNames('flex items-center', className)}>
				{post.image && (
					<figure className="w-16 mr-4">
						<GatsbyImage
							image={post.image.localFiles[0].childImageSharp.gatsbyImageData}
							className="rounded-l sm:rounded-sm"
							alt={post.title}
						/>
					</figure>
				)}

				<div>
					<h3 className="text-lg font-bold leading-6">{post.title}</h3>

					{post.subtitle && (
						<p className="inline-block mt-px text-sm text-gray-400">
							{post.subtitle}
						</p>
					)}
				</div>

				<FauxLink to={post.link.childMarkdownRemark.rawMarkdownBody}>
					{`View to ${post.title}`}
				</FauxLink>

				<Disclosure title="Affiliate" />
			</div>
		</Card>
	)
}

export { Product }
