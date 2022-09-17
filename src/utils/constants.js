import {
  UserCircleIcon as AccountIcon,
  EnvelopeIcon as EmailIcon,
  HeartIcon as FavoritesIcon,
  CheckCircleIcon as FinishedIcon,
  RssIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export const ACCOUNT_NAV = [
  {
    name: 'Account Settings',
    to: '/account/',
    icon: (props) => <AccountIcon {...props} />,
  },
  {
    name: 'Favorites',
    to: '/account/favorites/',
    icon: (props) => <FavoritesIcon {...props} />,
  },
  {
    name: 'Finished',
    to: '/account/finished/',
    icon: (props) => <FinishedIcon {...props} />,
  },
]

export const COMPANY_NAV = [
  { name: 'About', href: '/about/' },
  { name: 'Beliefs', href: '/summary-of-essential-beliefs/' },
  { name: 'Contact', href: 'mailto:contact@gettreadtalks.com' },
]

export const CONTENT_NAV = [
  { name: 'Talks', href: '/talks/' },
  { name: 'Speakers', href: '/speakers/' },
  { name: 'Series', href: '/series/' },
  { name: 'Clips', href: '/clips/' },
]

export const RESOURCES_NAV = [
  { name: 'Bibles', href: 'https://www.crossway.org/bibles/' },
  { name: 'Bible App', href: 'https://apps.apple.com/us/app/esv-bible/id361797273' },
  { name: 'Bible Study Tools', href: 'https://www.logos.com/' },
]

export const PRIMARY_NAV = [
  { name: 'Talks', to: '/talks/' },
  { name: 'Speakers', to: '/speakers/' },
  { name: 'Series', to: '/series/' },
  { name: 'Clips', to: '/clips/' },
]

export const SOCIAL_NAV = [
  {
    name: 'Email Subscribe',
    href: 'https://mailchi.mp/50e8781cd6b2/newsletter-landing-page',
    icon: (props) => <EmailIcon {...props} />,
  },
  {
    name: 'RSS Feed',
    href: 'https://gettreadtalks.com/rss.xml',
    icon: (props) => <RssIcon {...props} />,
  },
]
