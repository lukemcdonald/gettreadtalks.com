# TREAD Talks

## Development

When updates are pushed to the 'develop' branch, those changes can be seen live here:

https://develop--treadtalks.netlify.com

Alternatively, a build version of the site that will be used on the live site can be tested locally using the `npm run serve` command.

## ToDo's

- [] Improve SEO Meta (Link)[https://metatags.io/] with (JSON-LD)[https://jsonld.com/breadcrumb/] and an (SEO Component)[https://www.gatsbyjs.org/docs/add-seo-component/]
  - [](Breadcrumbs)[https://developers.google.com/search/docs/data-types/breadcrumb] - [](Corporate Contact)[https://developers.google.com/search/docs/data-types/corporate-contact]
  - [](Logo)[https://developers.google.com/search/docs/data-types/logo]
  - [](Media Actions)[https://developers.google.com/actions/media/]
  - [] (Sitelinks Searchbox)[https://developers.google.com/search/docs/data-types/sitelinks-searchbox]
    - [](Social Profile)[https://developers.google.com/search/docs/data-types/social-profile]
- [](Pagination)[https://www.gatsbyjs.org/docs/adding-pagination/]
- [] Improve single talk page
  - [x] Fix talk link button on mobile
  - [x] Add link speaker to archive
  - [] Add short description
- [] Improve talks card
  - [] Add external link
  - [] Add featured talk indicator
- [] React/Gatsby Themes config
- [] Primary Navigation Submenu [Design](https://twitter.com/steveschoger/status/953297226985549825)
- [][reakit](https://github.com/reakit/reakit) integration
- [] Series Archive and Pages
- [] Clips Archive and Pages
- [] Subscribe Form
- [] Sidebar Layout
- [] Footer Navigation
- [] Social Navigation
- [] Statement of Faith page.
  - [] Include [TOC](https://github.com/remarkjs/remark-toc) like Berean
  - [] Add menu item under About or links in footer
- [] Display iTunes Affiliate Links
  - [] Featured Links in Footer
  - [] Add resources page to list all links by category/type (include link in footer menu)
- [] Add [oEmbed](https://github.com/raae/gatsby-remark-oembed) for YouTube, Vimeo, and SoundCloud
  - https://github.com/gatsbyjs/gatsby/issues/8788
  - https://github.com/gatsbyjs/gatsby/pull/10146
- [x] Manage affiliate products via Airtable
  - [] Fix affiliate link not linking to correct product on refresh. Use stateful component to manage product on componentDidMount.
- [] Confessional Statement [page](https://bbcmonticello.com/about/confessional-statement/)
  - [] Use FAQ [react accordion](https://github.com/springload/react-accessible-accordion) design like [convert kit](https://convertkit.com/pricing/)
- [x] Add Search - Gatsby (setup)[https://www.gatsbyjs.org/docs/adding-search/]
  - [x] Algolia search (setup and filters)[https://community.algolia.com/react-instantsearch/videos/]
- [x] MailChimp integration
  - [x] RSS Feed (Zapier RSS)
- [x] Setup auto deploy/build for Netlfiy using Zapier
- [x] Check dependencies and devDependencies are in right place. May not need all deps
- [x] Improve performance and caching
- [x] Refactor to use [Gatsby Airtable](https://github.com/jbolda/gatsby-source-airtable)
- [x] Update URL paths
  - [x] Talks `/talks/`
  - [x] Featured Talks `/featured/`
  - [x] Speakers `/speakers/`
  - [x] Speaker `/by/${speaker}/`
  - [x] Talk `/by/${speaker}/${talk}/`
  - [x] Topics `/topics/`
  - [x] Topic `/on/${topic}/`
