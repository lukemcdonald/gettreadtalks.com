import clsx from 'clsx'

import { Image } from '~/components/image'
import type { ImageProps } from '~/components/image'

interface Props {
  alt?: string
  className?: string
  image: string | ImageProps['image']
}

function CardImage({ alt = '', className, image, ...props }: Props) {
  if (!image) {
    return null
  }

  // Handle string URLs
  if (typeof image === 'string') {
    return (
      <img
        alt={alt}
        className={clsx('flex-shrink-0 rounded-full', className || 'h-16 w-16')}
        src={image}
        {...props}
      />
    )
  }

  // Handle complex Gatsby image objects
  return (
    <Image
      alt={alt}
      className={clsx('flex-shrink-0', className || 'h-16 w-16 rounded-full')}
      image={image}
      imgClassName="rounded-full"
      {...props}
    />
  )
}

export default CardImage
