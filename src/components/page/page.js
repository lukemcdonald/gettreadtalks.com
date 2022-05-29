import React from 'react'

import PageTitle from './page-title'

function Page({ children, className }) {
  return <div className={className}>{children}</div>
}

export default Object.assign(Page, {
  Title: PageTitle,
})
