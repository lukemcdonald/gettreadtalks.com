import React from 'react'
import classnames from 'classnames'

function TextCarousel({ className, fontSize = '16vw', text }) {
	const string = text.split(' ')

	return (
		<div className="absolute inset-0 z-0 hidden md:flex md:flex-col">
			<ul
				className={classnames(
					'sticky px-12 font-black leading-none tracking-tighter text-gray-200 uppercase transform css-slideshow overflow-hidden',
					className
				)}
				style={{ fontSize }}
			>
				{string.map((word, index) => (
					<li key={`${word}-${index}`} className="text-right">
						{word}
					</li>
				))}
			</ul>
		</div>
	)
}

export default TextCarousel
