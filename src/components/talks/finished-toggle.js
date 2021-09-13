import React from 'react'
import classNames from 'classnames'
import { CheckIcon as CheckOutlineIcon } from '@heroicons/react/outline'
import { CheckIcon as CheckSolidIcon } from '@heroicons/react/solid'

import { useFinishedTalk } from 'hooks/finished-talk'
import { useUsers } from 'context/users'
import { Toggle, ToggleOn, ToggleOff, ToggleButton } from 'components/toggle'

function FinishedToggle({ classNameToggle = {}, talk, ...props }) {
	const [enabled, setEnabled] = React.useState(false)
	const { user } = useUsers()
	const { isFinished, updateFinished } = useFinishedTalk()

	React.useEffect(() => {
		setEnabled(isFinished(talk))
	}, [isFinished, talk])

	if (!user) {
		return null
	}

	return (
		<Toggle>
			<ToggleButton
				checked={enabled}
				onChange={() => updateFinished(talk)}
				className="relative inline-flex items-center rounded-full"
				{...props}
			>
				<span className="sr-only">Save as finished</span>
				<ToggleOn>
					<CheckSolidIcon
						className={classNames('w-full h-full', classNameToggle?.on)}
					/>
				</ToggleOn>
				<ToggleOff>
					<CheckOutlineIcon
						className={classNames('w-full h-full', classNameToggle?.off)}
					/>
				</ToggleOff>
			</ToggleButton>
		</Toggle>
	)
}

export { FinishedToggle }
