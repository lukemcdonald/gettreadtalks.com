import type { GatsbyBrowser, GatsbySSR } from 'gatsby'

import { App } from '~/app'
import { AppProviders } from '~/context'

import '~/assets/css/styles.css'

type WrapPageElement = GatsbyBrowser['wrapPageElement'] | GatsbySSR['wrapPageElement']

export const wrapPageElement: WrapPageElement = ({ element, props }: any) => {
  return (
    <AppProviders>
      <App {...props}>{element}</App>
    </AppProviders>
  )
}
