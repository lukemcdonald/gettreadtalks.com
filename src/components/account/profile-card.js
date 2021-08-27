import React from 'react'
import Gravatar from 'react-gravatar'

function AccountProfileCard({ profile, showAvatar = 'show' }) {
	return (
		<div className="flex items-center">
			{showAvatar !== 'hide' && (
				<div className="flex-shrink-0 mr-4 ">
					<Gravatar
						email={profile.email}
						className="w-12 h-12 rounded-full"
						default="mp"
					/>
				</div>
			)}

			<p className="truncate">
				<span className="block mb-0.5 text-xs text-gray-500">Signed in as</span>
				<span className="block text-sm font-semibold truncate">
					{profile.email}
				</span>
			</p>
		</div>
	)
}

export { AccountProfileCard }
