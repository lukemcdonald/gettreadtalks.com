import React from 'react'
import { navigate } from 'gatsby'

import { useAuth } from 'context/auth'

import { Link } from 'components/link'
import { LoginForm } from 'components/account/login-form'
import { Page } from 'components/page'
import { Section } from 'components/section'
import { SEO } from 'components/seo'

import formStyles from 'components/styles/form'

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
              <LoginForm className={formStyles.fieldset} onSubmit={login} buttonText="Sign in to account" />

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
