import { HeartIcon } from '@heroicons/react/24/outline'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import React from 'react'

import { SubscribeForm } from '~/components/newsletter/subscribe-form'
import { useAffiliateLinks } from '~/hooks/affiliate-links'
import { COMPANY_NAV, CONTENT_NAV, RESOURCES_NAV, SOCIAL_NAV } from '~/utils/constants'

import WidgetAffiliateLink from './widget/widget-affiliate-link'
import WidgetNavigation from './widget/widget-navigation'

function Footer({ siteTitle }) {
  const { randomLink } = useAffiliateLinks()

  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <WidgetNavigation title="Engage" navigation={CONTENT_NAV} />
              <WidgetNavigation
                className="mt-12 md:mt-0"
                title="General"
                navigation={COMPANY_NAV}
              />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <WidgetNavigation title="Resources" navigation={RESOURCES_NAV} />
              <WidgetAffiliateLink className="mt-12 md:mt-0" data={randomLink} />
            </div>
          </div>

          <SubscribeForm
            className="mt-12 xl:mt-0"
            title="Newsletter"
            text="Get the latest news, articles, and resources sent to your inbox."
            onSubmit={addToMailchimp}
          />
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {SOCIAL_NAV.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; {`${siteTitle} ${new Date().getFullYear()}`}
          </p>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            Made with&nbsp;
            <a className="inline-block group" href="https://lukemcdonald.com">
              {
                <HeartIcon className="w-6 h-6 inline-block group-hover:text-primary-600 relative bottom-[2px]" />
              }{' '}
              by Luke McDonald
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
