import React from 'react'
import { RssIcon, MailIcon } from '@heroicons/react/outline'
import { Disclosure } from 'components/affiliates/disclosure'
import classNames from 'classnames'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import { Image } from 'components/image'
import { Link } from 'components/link'
import { SubscribeForm } from 'components/newsletter/subscribe-form'
import { useAffiliateLinks } from 'hooks/affiliate-links'

const navigation = {
  company: [
    { name: 'About', href: '/about/' },
    { name: 'Beliefs', href: '/summary-of-essential-beliefs/' },
    // todo: Create a contact page with a form for this.
    { name: 'Contact', href: 'mailto:contact@gettreadtalks.com' },
  ],
  content: [
    { name: 'Talks', href: '/talks/' },
    { name: 'Speakers', href: '/speakers/' },
    { name: 'Series', href: '/series/' },
    { name: 'Clips', href: '/clips/' },
    // { name: 'Testimonials', href: '/testimonials/' },
  ],
  // todo: add more resources
  resources: [
    {
      name: 'Bibles',
      href: 'https://www.crossway.org/bibles/',
    },
    {
      name: 'Bible App',
      href: 'https://apps.apple.com/us/app/esv-bible/id361797273',
    },
    {
      name: 'Bible Study Tools',
      href: 'https://www.logos.com/',
    },
  ],
  social: [
    {
      name: 'Email Subscribe',
      href: 'https://mailchi.mp/50e8781cd6b2/newsletter-landing-page',
      icon: (props) => <MailIcon {...props} />,
    },
    {
      name: 'RSS Feed',
      href: 'https://gettreadtalks.com/rss.xml',
      icon: (props) => <RssIcon {...props} />,
    },
  ],
}

function WidgetTitle({ className, title }) {
  return (
    <h3 className={classNames('text-sm font-semibold uppercase tracking-wider text-gray-400', className)}>{title}</h3>
  )
}

function NavigationWidget({ className, title, navigation }) {
  return (
    <nav className={className}>
      <WidgetTitle title={title} />
      <ul className="mt-4 space-y-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link to={item.href} className="text-base text-gray-500 hover:text-gray-900">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function AffiliateLinkWidget({ className, title, data }) {
  const affiliate = {
    ...data,
    description: data.description?.childMarkdownRemark.excerpt || '',
    link: data.link.childMarkdownRemark.rawMarkdownBody || '',
  }

  return (
    <div className={className}>
      <WidgetTitle title={title || affiliate.title} />
      <div className="relative mt-4 inline-block">
        <Link className="inline-block" to={affiliate.link}>
          <Image image={affiliate.image} imgClassName="rounded-sm" />
          {title && <h3 className="sr-only">{affiliate.title}</h3>}
        </Link>
        <Disclosure title="Affiliate">
          <p>
            A small commission may be earned through links, endorsements, recommendations, and/or testimonials for any
            products shown on this site. Your purchase helps support the website.
          </p>
        </Disclosure>
      </div>
    </div>
  )
}

function SiteFooter({ siteTitle }) {
  const { randomLink } = useAffiliateLinks()

  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <NavigationWidget title="Engage" navigation={navigation.content} />
              <NavigationWidget className="mt-12 md:mt-0" title="General" navigation={navigation.company} />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <NavigationWidget title="Resources" navigation={navigation.resources} />
              <AffiliateLinkWidget className="mt-12 md:mt-0" data={randomLink} />
            </div>
          </div>
          {
            // todo: This needs to be hooked up to Mailchimp.
          }
          <SubscribeForm
            className="mt-12 xl:mt-0"
            title="Newsletter"
            text="Get the latest news, articles, and resources sent to your inbox."
            onSubmit={addToMailchimp}
          />
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; {`${siteTitle} ${new Date().getFullYear()}`}
          </p>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
