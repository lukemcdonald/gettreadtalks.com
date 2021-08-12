import React from 'react'
import { useFavoriteTalk } from 'hooks/useFavoriteTalk'
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from 'components/toggle'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

function FavoriteToggle({ classNameToggle = {}, talk, ...props }) {
	const [enabled, setEnabled] = React.useState(false)
	const { isFavorite, updateFavorite } = useFavoriteTalk()

	// Set default enabled state if talk is in favorite.
	React.useEffect(() => {
		const _isFavorite = isFavorite(talk)
		setEnabled(_isFavorite)
	}, [enabled, isFavorite, talk])

	return (
		<Toggle>
			<ToggleButton
				checked={enabled}
				onChange={() => updateFavorite(talk)}
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
