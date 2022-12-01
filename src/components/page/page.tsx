import React from 'react'

import PageTitle from './page-title'

interface Props {
  children: React.ReactNode
  className?: string
}

function Page({ children, className }: Props) {
  return <div className={className}>{children}</div>
}

export default Object.assign(Page, {
  Title: PageTitle,
})
