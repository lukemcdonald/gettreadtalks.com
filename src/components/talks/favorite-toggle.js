import React from 'react'
import classNames from 'classnames'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'

import { useFavoriteTalk } from 'hooks/favorite-talk'
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from 'components/toggle'
import { useUsers } from 'context/users'

function FavoriteToggle({ classNameToggle = {}, talk, ...props }) {
	const [enabled, setEnabled] = React.useState(false)
	const { user } = useUsers()
	const { isFavorite, updateFavorite } = useFavoriteTalk()

	// Set default enabled state if talk is in favorite.
	React.useEffect(() => {
		const _isFavorite = isFavorite(talk)
		setEnabled(_isFavorite)
	}, [enabled, isFavorite, talk])

	if (!user) {
		return null
	}

	return (
		<Toggle>
			<ToggleButton
				checked={enabled}
				onChange={() => updateFavorite(talk)}
				className="relative inline-flex items-center rounded-full"
				{...props}
			>
				<span className="sr-only">Add to favorites</span>
				<ToggleOn>
					<HeartSolidIcon
						className={classNames('w-full h-full', classNameToggle?.on)}
					/>
				</ToggleOn>
				<ToggleOff>
					<HeartOutlineIcon
						className={classNames('w-full h-full', classNameToggle?.off)}
					/>
				</ToggleOff>
			</ToggleButton>
		</Toggle>
	)
}

export { FavoriteToggle }
