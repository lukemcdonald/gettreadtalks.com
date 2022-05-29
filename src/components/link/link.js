import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

import LinkButton from './link-button'

function Link({ children, to, ...other }) {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink to={to} rel="canonical" {...other}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export default Object.assign(Link, {
  Button: LinkButton,
})
