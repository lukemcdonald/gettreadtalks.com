import React from 'react';
import classnames from 'classnames';

export default function Card({ children, className, ...props }) {
	return (
		<article
			{...props}
			className={classnames(
				'relative flex items-center flex-grow gap-4 p-4 text-gray-700 bg-white rounded-t hover:z-10 hover:border-red-600 hover:shadow-lg md:border md:border-gray-300 md:rounded md:transition md:duration-300',
				className
			)}
		>
			{children}
		</article>
	);
}
