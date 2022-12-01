import WidgetTitle from './widget-title'

import type { ImageProps } from '~/components/image/image'
import { AffiliateDisclosure } from '~/components/affiliate'
import { Image } from '~/components/image'
import { Link } from '~/components/link'

interface MarkdownRemark {
  childMarkdownRemark: {
    excerpt: string
    rawMarkdownBody: string
  }
}

interface Props {
  className?: string
  data: {
    description?: MarkdownRemark
    image: ImageProps['image']
    link?: MarkdownRemark
    title?: string
  }
  disclosure?: string
  title?: string
}

const disclosureText =
  'A small commission may be earned through links, endorsements, recommendations, and/or testimonials for any products shown on this site. Your purchase helps support the website.'

function WidgetAffiliateLink({ className, data, disclosure = disclosureText, title }: Props) {
  const affiliate = {
    ...data,
    description: data.description?.childMarkdownRemark.excerpt || '',
    link: data.link?.childMarkdownRemark.rawMarkdownBody || '',
  }

  const widgetTitle = title || affiliate.title

  return (
    <div className={className}>
      {widgetTitle ? <WidgetTitle>{widgetTitle}</WidgetTitle> : null}

      <div className="relative mt-4 inline-block">
        <Link className="inline-block" to={affiliate.link}>
          <Image alt="" image={affiliate.image} imgClassName="rounded-sm" />
          {affiliate.title ? <h3 className="sr-only">{affiliate.title}</h3> : null}
        </Link>

        {disclosure ? (
          <AffiliateDisclosure title="Affiliate">
            <p>{disclosure}</p>
          </AffiliateDisclosure>
        ) : null}
      </div>
    </div>
  )
}

export default WidgetAffiliateLink
