import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid'

import { useFavoriteTalk } from 'hooks/useFavoriteTalk'

function HeartIcon({ checked, className }) {
	return (
		<div className={className}>
			<span className="sr-only">Add to favorites</span>
			<HeartSolidIcon className={`${checked ? 'w-full h-full' : 'hidden'}`} />
			<HeartOutlineIcon className={`${checked ? 'hidden' : 'w-full h-full'}`} />
		</div>
	)
}

function FavoriteTalkToggleButton({ talk, ...props }) {
	const [enabled, setEnabled] = useState(false)
	const { isFavorite, updateFavorite } = useFavoriteTalk(talk)

	// Set default enabled state if talk is in favorite.
	React.useEffect(() => {
		const _isFavorite = isFavorite(talk)
		setEnabled(_isFavorite)
	}, [isFavorite, talk])

	function handleOnChange(isEnabled) {
		setEnabled(isEnabled)
		updateFavorite({ id: talk.id })
	}

	return (
		<Switch
			checked={enabled}
			onChange={(value) => handleOnChange(value)}
			{...props}
		/>
	)
}

export { HeartIcon, FavoriteTalkToggleButton }
