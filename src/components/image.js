import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

function Image({ image = {}, alt, ...props }) {
  const img = image?.localFiles?.[0].childImageSharp.gatsbyImageData || image

  return <GatsbyImage image={img} alt={alt || ''} {...props} />
}

export default Image
