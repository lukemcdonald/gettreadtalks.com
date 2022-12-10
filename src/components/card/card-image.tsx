import clsx from 'clsx'

import { Image } from '~/components/image'
import type { TAny } from '~/utils/types/shared'

interface Props {
  alt?: string
  className?: string
  image: TAny
}

function CardImage({ alt = '', className, image, ...props }: Props) {
  return (
    <>
      {image ? (
        <Image
          alt={alt}
          className={clsx('flex-shrink-0', className || 'h-16 w-16 rounded-full')}
          image={image}
          imgClassName="rounded-full"
          {...props}
        />
      ) : null}
    </>
  )
}

export default CardImage
