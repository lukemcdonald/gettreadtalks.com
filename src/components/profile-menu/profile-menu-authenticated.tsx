import {
  ArrowLeftOnRectangleIcon as LogoutIcon,
  CheckCircleIcon as CheckIcon,
  HeartIcon,
  UserCircleIcon as UserIcon,
} from '@heroicons/react/24/outline'

import ProfileMenuItem from './profile-menu-item'
import { ProfileCard } from '~/components/account/profile-card'
import { useAsync } from '~/hooks/async'
import { useAuth } from '~/context/auth'

const AuthenticatedMenu = () => {
  const { logout, profile } = useAuth()
  const { run } = useAsync()

  return (
    <>
      <div className="px-3.5 py-3">
        <ProfileCard profile={profile} />
      </div>
      <div className="p-1">
        <ProfileMenuItem to="/account/favorites/" icon={HeartIcon} title="Favorites" />
        <ProfileMenuItem to="/account/finished/" icon={CheckIcon} title="Finished" />
      </div>
      <div className="p-1">
        <ProfileMenuItem to="/account/" icon={UserIcon} title="Settings" />
        <ProfileMenuItem
          to="/account/"
          icon={LogoutIcon}
          title="Sign out"
          as="button"
          onClick={() => run(logout())}
        />
      </div>
    </>
  )
}

export default AuthenticatedMenu
