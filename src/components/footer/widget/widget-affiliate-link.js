import React from 'react'

import { AffiliateDisclosure } from '~/components/affiliate'
import { Image } from '~/components/image'
import { Link } from '~/components/link'

import WidgetTitle from './widget-title'

function WidgetAffiliateLink({ className, title, data }) {
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

        <AffiliateDisclosure title="Affiliate">
          <p>
            A small commission may be earned through links, endorsements, recommendations, and/or
            testimonials for any products shown on this site. Your purchase helps support the
            website.
          </p>
        </AffiliateDisclosure>
      </div>
    </div>
  )
}

export default WidgetAffiliateLink
