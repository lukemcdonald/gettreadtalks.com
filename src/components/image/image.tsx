import { GatsbyImage } from 'gatsby-plugin-image'
import type { GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image'

interface ChildImageSharp {
  gatsbyImageData: IGatsbyImageData
}

interface GatsbyImageDataWithImageSharp extends IGatsbyImageData {
  childImageSharp?: ChildImageSharp
  localFiles: {
    childImageSharp: ChildImageSharp
  }[]
}

export interface ImageProps extends Omit<GatsbyImageProps, 'alt' | 'image'> {
  alt?: string
  image: GatsbyImageDataWithImageSharp
}

function Image({ alt = '', image, ...props }: ImageProps) {
  const img = image?.localFiles?.[0].childImageSharp.gatsbyImageData || image

  return <GatsbyImage image={img} alt={alt} {...props} />
}

export default Image
