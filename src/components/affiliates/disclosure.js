import React from 'react';
import classnames from 'classnames';

export default function Disclosure(props) {
	const {
		className = '',
		title = `Ad`,
		content = `We may earn a small commission for this endorsement, recommendation,
  testimonial, and/or link to any products or services from this website.
  Your purchase helps support the site.`,
	} = props;

	return (
		<button
			className={classnames(
				'absolute bottom-0 right-0 px-1 mb-1 mr-1 text-sm rounded-sm group z-40 ',
				className.includes('text-gray-') || 'text-gray-500',
				className.includes('bg-gray-') || 'bg-gray-200',
				className
			)}
			type="button"
		>
			{title && <div>{title}</div>}
			{content && (
				<div className="absolute hidden px-3 py-2 text-xs text-left text-gray-500 bg-gray-200 rounded-sm bottom-6 -left-96 group-hover:block ring-4 ring-white">
					{content}
				</div>
			)}
		</button>
	);
}
