import classNames from 'classnames'
import React from 'react'

import { Image } from '~/components/image'

function CardImage({ className, image, ...props }) {
  return (
    <>
      {image && (
        <Image
          image={image}
          className={classNames('flex-shrink-0', className || 'h-16 w-16 rounded-full')}
          imgClassName="rounded-full"
          {...props}
        />
      )}
    </>
  )
}

export default CardImage
