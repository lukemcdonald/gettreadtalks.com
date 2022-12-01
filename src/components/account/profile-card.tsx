import Gravatar from 'react-gravatar'
import type { AuthUser } from '~/context/auth'

interface Props {
  profile: AuthUser
  showAvatar?: boolean
}

function ProfileCard({ profile, showAvatar = false }: Props) {
  if (!profile?.email) {
    throw new Error('Email is required to display profile card.')
  }

  return (
    <div className="flex items-center">
      {showAvatar ? (
        <div className="mr-4 flex-shrink-0 ">
          <Gravatar email={profile.email} className="h-12 w-12 rounded-full" default="mp" />
        </div>
      ) : null}

      <p className="truncate">
        <span className="mb-0.5 block text-xs text-gray-500">Signed in as</span>
        <span className="block truncate text-sm font-semibold">{profile.email}</span>
      </p>
    </div>
  )
}

export { ProfileCard }
