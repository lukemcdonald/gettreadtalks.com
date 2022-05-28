// todo: Setup Firebase functionality to handle email and password updates onClick event handlers.
import { navigate } from 'gatsby'
import React from 'react'

import { SEO, Section } from '~/components'
import { DeactivateAccountButton } from '~/components/account/deactivate-dialog'
import { ProfileCard } from '~/components/account/profile-card'
import { SettingsEmailForm } from '~/components/account/settings-email-form'
import { SettingsPasswordForm } from '~/components/account/settings-password-form'
import { AccountMenu } from '~/components/menus/account'
import { useAuth } from '~/context/auth'

function AccountPage({ location }) {
  const { isUser, profile, updateSettings } = useAuth()

  if (!isUser) {
    navigate('/login/')
    return null
  }

  return (
    <>
      <SEO title="Your Account" location={location} />

      <Section>
        <Section.Sidebar className="space-y-6">
          <AccountMenu />
        </Section.Sidebar>

        <Section.Content>
          <div className="space-y-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3.5 sm:rounded-t-lg">
                <ProfileCard profile={profile} />
              </div>

              <div className="px-4 py-5 sm:p-6">
                <h1 className="text-lg font-medium leading-6 text-gray-900">Email settings</h1>

                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Manage the email address associated with your account.</p>
                </div>

                <div className="mt-5">
                  <SettingsEmailForm onSubmit={updateSettings} buttonText="Update email" />
                </div>
              </div>

              <div className="border-t border-gray-100 px-4 py-5 sm:p-6">
                <h1 className="text-lg font-medium leading-6 text-gray-900">Password settings</h1>

                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Update the password associated with your account.</p>
                </div>

                <div className="mt-5">
                  <SettingsPasswordForm onSubmit={updateSettings} buttonText="Update password" />
                </div>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Delete your account</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Once you delete your account, you will lose all data associated with it.</p>
                </div>
                <div className="mt-5">
                  <DeactivateAccountButton
                    className="bg-primary-100 text-primary-700 hover:bg-primary-200"
                    buttonText="Delete account"
                  />
                </div>
              </div>
            </div>
          </div>
        </Section.Content>
      </Section>
    </>
  )
}

export default AccountPage
