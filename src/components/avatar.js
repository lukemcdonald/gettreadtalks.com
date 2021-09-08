import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

function Avatar({ image, ...props }) {
	const avatar = image?.localFiles?.[0].childImageSharp.gatsbyImageData || image
	return <GatsbyImage image={avatar} {...props} />
}

export { Avatar }
