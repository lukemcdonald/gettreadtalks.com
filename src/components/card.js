import React from 'react';
import classnames from 'classnames';

export default function Card({ children, className, ...props }) {
	return (
		<article
			{...props}
			className={classnames(
				'relative text-gray-700 flex flex-grow items-center gap-4 p-4 bg-white rounded-t hover:z-10 hover:border-red-600 hover:shadow-lg md:border md:border-gray-300 md:mb-4 md:rounded md:transition md:duration-300 lg:mb-6',
				className
			)}
		>
			{children}
		</article>
	);
}
