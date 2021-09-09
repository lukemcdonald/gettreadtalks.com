import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

function Image({ image, ...props }) {
	const img = image?.localFiles?.[0].childImageSharp.gatsbyImageData || image
	return <GatsbyImage image={img} {...props} />
}

export { Image }
