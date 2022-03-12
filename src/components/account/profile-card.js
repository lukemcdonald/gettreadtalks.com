import React from 'react'
import Gravatar from 'react-gravatar'

function ProfileCard({ profile, showAvatar = 'show' }) {
  return (
    <div className="flex items-center">
      {showAvatar !== 'hide' && (
        <div className="mr-4 flex-shrink-0 ">
          <Gravatar email={profile.email} className="h-12 w-12 rounded-full" default="mp" />
        </div>
      )}

      <p className="truncate">
        <span className="mb-0.5 block text-xs text-gray-500">Signed in as</span>
        <span className="block truncate text-sm font-semibold">{profile.email}</span>
      </p>
    </div>
  )
}

export { ProfileCard }
