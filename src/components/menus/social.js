import React from 'react'
import classNames from 'classnames'
import { MailIcon, RssIcon } from '@heroicons/react/solid'

import { Link } from 'components/link'

const links = [
	{
		name: 'Email Subscribe',
		to: 'https://mailchi.mp/50e8781cd6b2/newsletter-landing-page',
		icon: (props) => <MailIcon {...props} />,
	},
	{
		name: 'RSS Feed',
		to: 'https://gettreadtalks.com/rss.xml',
		icon: (props) => <RssIcon {...props} />,
	},
]

function SocialMenu({ onClick }) {
	return (
		<ul
			className={classNames(
				'hidden h-5 border-l border-gray-300 md:block',
				'md:flex md:items-center md:space-x-3 px-3'
			)}
		>
			{links.map((link) => (
				<li key={link.name}>
					<Link
						className="block px-4 py-3 text-gray-700 hover:text-gray-900 md:px-0 md:py-0"
						to={link.to}
						onClick={onClick}
						title="Email Subscribe"
						target="blank"
					>
						<link.icon className="w-6 h-6" />
					</Link>
				</li>
			))}
		</ul>
	)
}

export { SocialMenu }
