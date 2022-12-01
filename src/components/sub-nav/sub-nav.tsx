import { Link } from '~/components/link'
import { Section } from '~/components/section'
import type { TLink } from '~/utils/types/shared'

interface Props {
  className?: string
  links: TLink[]
  title?: string
}

function SubNav({ className, links, title }: Props) {
  return (
    <nav className={className}>
      {title ? <Section.Title as="h2">{title}</Section.Title> : null}

      <ul>
        {links.map((link) => (
          <li key={link.to} className="mb-1">
            <Link
              to={link.to}
              className="relative -mx-2 block rounded px-2 py-1 font-medium text-gray-600 hover:text-gray-900 md:inline-block"
              activeClassName="text-primary-600 hover:text-primary-600 font-bold"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SubNav
