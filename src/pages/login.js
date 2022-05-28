import { navigate } from 'gatsby'
import React from 'react'

import { Link, Page, SEO, Section } from '~/components'
import { LoginForm } from '~/components/account/login-form'
import formStyles from '~/components/styles/form'
import { useAuth } from '~/context/auth'

function LoginPage({ location }) {
  const { login, isUser } = useAuth()

  if (isUser) {
    navigate('/account/')
    return null
  }

  return (
    <>
      <SEO title="Sign in" location={location} />

      <Section>
        <Section.Sidebar>
          <Page.Title>Sign in to your account</Page.Title>

          <div className="prose mt-2">
            <p>
              Don't have an account? <Link to="/register">Get access &rarr;</Link>
            </p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <div className="relative z-10 flex flex-auto items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm
                className={formStyles.fieldset}
                onSubmit={login}
                buttonText="Sign in to account"
              />

              <div className="prose mt-6 text-center">
                <p>
                  <Link to="/password/reset" className="text-sm underline hover:text-gray-900">
                    Forgot password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Section.Content>
      </Section>
    </>
  )
}

export default LoginPage
