import React from 'react'

import { AffiliateDisclosure } from '~/components/affiliate'
import { Card } from '~/components/card'

function AffiliateLinkCard({ data: post }) {
  return (
    <Card.Wrapper>
      <Card.Image
        image={post.image}
        className="mr-1 w-16"
        imgClassName="rounded-l sm:rounded-sm"
        alt={post.title}
      />
      <Card.Content
        to={post.link.childMarkdownRemark.rawMarkdownBody}
        title={post.title}
        text={post.subtitle}
      />
      <AffiliateDisclosure title="Affiliate" className="absolute bottom-0 right-1">
        <p>
          A small commission may be earned through links, endorsements, recommendations, and/or
          testimonials for any products shown on this site. Your purchase helps support the website.
        </p>
      </AffiliateDisclosure>
    </Card.Wrapper>
  )
}

export default AffiliateLinkCard
