import React from 'react';

export default function Card({ children, ...props }) {
	return (
		<article
			{...props}
			className="-mb-1 bg-white border border-grey-lighter border-solid flex flex-grow flex-col justify-between p-4 relative rounded-t hover:z-10 hover:border md:mb-4 md:rounded md:border lg:mb-6 lg:p-6 hover:border-brand hover:shadow-lg last:mb-0 last:rounded-bl last:rounded-br first:border-t first:rounded-tl first:rounded-tr"
		>
			{children}
		</article>
	);
}
