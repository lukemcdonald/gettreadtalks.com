import React from 'react'

import { Disclosure } from '~/components/affiliates/disclosure'
import { CardContent, CardImage, CardWrapper } from '~/components/card'

function AffiliateLinkCard({ data: post }) {
  return (
    <CardWrapper>
      <CardImage
        image={post.image}
        className="mr-1 w-16"
        imgClassName="rounded-l sm:rounded-sm"
        alt={post.title}
      />
      <CardContent
        to={post.link.childMarkdownRemark.rawMarkdownBody}
        title={post.title}
        text={post.subtitle}
      />
      <Disclosure title="Affiliate" className="absolute bottom-0 right-1">
        <p>
          A small commission may be earned through links, endorsements, recommendations, and/or
          testimonials for any products shown on this site. Your purchase helps support the website.
        </p>
      </Disclosure>
    </CardWrapper>
  )
}

export { AffiliateLinkCard }
