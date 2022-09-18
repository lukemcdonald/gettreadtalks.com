import {
  UserCircleIcon as AccountIcon,
  EnvelopeIcon as EmailIcon,
  HeartIcon as FavoritesIcon,
  CheckCircleIcon as FinishedIcon,
  RssIcon,
} from '@heroicons/react/24/outline'
import type { NavigationItem } from './types/shared'

export const ACCOUNT_NAV: NavigationItem[] = [
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

export const COMPANY_NAV: NavigationItem[] = [
  { name: 'About', to: '/about/' },
  { name: 'Beliefs', to: '/summary-of-essential-beliefs/' },
  { name: 'Contact', to: 'mailto:contact@gettreadtalks.com' },
]

export const CONTENT_NAV: NavigationItem[] = [
  { name: 'Talks', to: '/talks/' },
  { name: 'Speakers', to: '/speakers/' },
  { name: 'Series', to: '/series/' },
  { name: 'Clips', to: '/clips/' },
]

export const RESOURCES_NAV: NavigationItem[] = [
  { name: 'Bibles', to: 'https://www.crossway.org/bibles/' },
  { name: 'Bible App', to: 'https://apps.apple.com/us/app/esv-bible/id361797273' },
  { name: 'Bible Study Tools', to: 'https://www.logos.com/' },
]

export const PRIMARY_NAV: NavigationItem[] = [
  { name: 'Talks', to: '/talks/' },
  { name: 'Speakers', to: '/speakers/' },
  { name: 'Series', to: '/series/' },
  { name: 'Clips', to: '/clips/' },
]

export const SOCIAL_NAV: NavigationItem[] = [
  {
    name: 'Email Subscribe',
    to: 'https://mailchi.mp/50e8781cd6b2/newsletter-landing-page',
    icon: (props) => <EmailIcon {...props} />,
  },
  {
    name: 'RSS Feed',
    to: 'https://gettreadtalks.com/rss.xml',
    icon: (props) => <RssIcon {...props} />,
  },
]
