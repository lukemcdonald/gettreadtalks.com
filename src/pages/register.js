import React from 'react'
import { navigate } from 'gatsby'

import { useAuth } from 'context/auth'

import { Link } from 'components/link'
import { Section } from 'components/section'
import { SEO } from 'components/seo'
import { Page } from 'components/page'
import { LoginForm } from 'components/account/login-form'
import formStyles from 'components/styles/form'

function RegisterPage({ location }) {
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

          <div className="mt-2 prose">
            <p>Create a free account and enjoy the benefits of bookmarking your own talks on TREAD Talks.</p>
            <p>
              Or <Link to="/login">sign in to your account &rarr;</Link>
            </p>
          </div>
        </Section.Sidebar>

        <Section.Content>
          <div className="relative z-10 flex items-center justify-center flex-auto">
            <div className="w-full max-w-md">
              <LoginForm className={formStyles.fieldset} onSubmit={register} buttonText="Register your account" />
            </div>
          </div>
        </Section.Content>
      </Section>
    </>
  )
}

export default RegisterPage
