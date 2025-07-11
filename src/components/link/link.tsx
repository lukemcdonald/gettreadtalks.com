import type { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import LinkButton from './link-button'

interface Props {
  children: ReactNode
  to: string
  [key: string]: unknown
}

function Link({ children, to, ...props }: Props) {
  if (typeof to !== 'string') {
    return null
  }

  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink to={to} rel="canonical" {...props}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...props}>
      {children}
    </a>
  )
}

export default Object.assign(Link, {
  Button: LinkButton,
})
