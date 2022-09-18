import type TFirebase from 'firebase/app'

// Todo: Remove all uses of this type and replace with the correct type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAny = any
// Todo: Remove all uses of this type and replace with the correct type
export type TUnknown = unknown

export type Nullable<T> = T | null | undefined

export interface NavigationItem {
  name: string
  to: string
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
}

export interface IFirebase {
  app: TFirebase.app.App
  firestoreData: TFirebase.firestore.DocumentData
  firestoreOptions: TFirebase.firestore.SetOptions
  user: TFirebase.User
  userCredential: TFirebase.auth.UserCredential
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
