import React from 'react';
import classnames from 'classnames';

export default function Card({ children, className, ...props }) {
	return (
		<article
			{...props}
			className={classnames(
				'transition duration-300 text-gray-700 relative flex flex-col justify-between flex-grow p-4 -mb-1 bg-white border rounded-t border-gray-300 last:mb-0 first:border-t first:rounded-tl first:rounded-tr last:rounded-bl last:rounded-br hover:z-10 hover:border-red-600 hover:shadow-lg md:mb-4 md:rounded lg:mb-6 lg:p-6 ',
				className
			)}
		>
			{children}
		</article>
	);
}
