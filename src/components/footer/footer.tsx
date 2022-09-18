import { HeartIcon } from '@heroicons/react/24/outline'

import { useAffiliateLinks } from '~/hooks/affiliate-links'
import { COMPANY_NAV, CONTENT_NAV, RESOURCES_NAV, SOCIAL_NAV } from '~/utils/constants'
import type { TAny } from '~/utils/types/shared'

import WidgetAffiliateLink from './widget/widget-affiliate-link'
import WidgetNavigation from './widget/widget-navigation'

interface Props {
  siteTitle: string
}

function Footer({ siteTitle }: Props) {
  const { randomLink } = useAffiliateLinks()

  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <WidgetNavigation navigation={CONTENT_NAV} title="Engage" />
              <WidgetNavigation
                className="mt-12 md:mt-0"
                navigation={COMPANY_NAV}
                title="General"
              />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <WidgetNavigation navigation={RESOURCES_NAV} title="Resources" />
              <WidgetAffiliateLink className="mt-12 md:mt-0" data={randomLink as TAny} />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {SOCIAL_NAV.map(({ to, name, icon: Icon = '' }) => (
              <a key={name} href={to} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{name}</span>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; {`${siteTitle} ${new Date().getFullYear()}`}
          </p>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            Made with&nbsp;
            <a className="group inline-block" href="https://lukemcdonald.com">
              <HeartIcon className="relative bottom-[2px] inline-block h-6 w-6 group-hover:text-primary-600" />
              <span>by Luke McDonald</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
