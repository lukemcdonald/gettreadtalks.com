// todo: this could probably use a basic email form with resetPassword as the onSubmit
import type { HeadFC, PageProps } from 'gatsby'

import styles from '~/utils/styles/form'
import { Link } from '~/components/link'
import { LoginForm } from '~/components/account/login-form'
import { Page } from '~/components/page'
import { SEO } from '~/components/seo'
import { Section } from '~/components/section'
import { useAuth } from '~/context/auth'

function ResetPassword({ location }: PageProps) {
  const { resetPassword } = useAuth()

  return (
    <Section>
      <Section.Sidebar>
        <Page.Title>Reset your password</Page.Title>
        <div className="prose mt-2">
          <p>Enter your email and we'll send you a link to reset your password.</p>
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
              onSubmit={resetPassword}
              buttonText="Reset your password"
              hiddenFields={['password']}
            />
          </div>
        </div>
      </Section.Content>
    </Section>
  )
}

export const Head: HeadFC = ({ location }) => {
  return <SEO title="Password Reset" location={location} />
}

export default ResetPassword
