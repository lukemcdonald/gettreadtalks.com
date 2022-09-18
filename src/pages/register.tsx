import { navigate } from 'gatsby'
import type { PageProps } from 'gatsby'

import styles from '~/utils/styles/form'
import { Link } from '~/components/link'
import { LoginForm } from '~/components/account/login-form'
import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { useAuth } from '~/context/auth'

function RegisterPage({ location }: PageProps) {
  const { register, isUser } = useAuth()

  if (isUser) {
    navigate('/account/')
    return null
  }

  return (
    <>
      <SEO title="Register" location={location} />

      <Section>
        <Section.Sidebar>
          <Page.Title>Create your account</Page.Title>

          <div className="prose mt-2">
            <p>
              Create a free account and enjoy the benefits of bookmarking your own talks on TREAD
              Talks.
            </p>
            <p>
              Or <Link to="/login">sign in to your account &rarr;</Link>
            </p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <div className="relative z-10 flex flex-auto items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm
                className={styles.fieldset}
                onSubmit={register}
                buttonText="Register your account"
              />
            </div>
          </div>
        </Section.Content>
      </Section>
    </>
  )
}

export default RegisterPage
