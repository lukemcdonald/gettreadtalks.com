import React from 'react'
import { Link } from 'components/link'
import { Section } from 'components/section'

function SubNav({ className, links = [], title }) {
  return (
    <nav className={className}>
      {title && <Section.Heading as="h2">{title}</Section.Heading>}

      <ul>
        {links.map((link) => (
          <li key={link.to} className="mb-1">
            <Link
              to={link.to}
              className="relative -mx-2 block rounded px-2 py-1 font-medium text-gray-600 hover:text-gray-900 md:inline-block"
              activeClassName="text-primary-600 hover:text-primary-600 font-bold"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { SubNav }
