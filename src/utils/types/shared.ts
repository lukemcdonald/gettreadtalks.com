import type { ComponentProps } from 'react'

export type Nullable<T> = T | null | undefined

export interface NavigationItem {
  name: string
  to: string
  icon?: (props: ComponentProps<'svg'>) => JSX.Element
}

export interface TLink {
  name: string
  to: string
}

export interface RemarkMedia {
  html: string | null
  htmlAst: {
    children: {
      children: {
        properties: {
          href: string
        }
      }[]
    }[]
  } | null
}
