import React from 'react';

export default function Disclosure(props) {
	const {
		title = 'Ad',
		content = `We may earn a small commission for this endorsement, recommendation,
		testimonial, and/or link to any products or services from this website.
		Your purchase helps support the site.`,
	} = props;

	return (
		<>
			{title && <div>{title}</div>}
			{content && <div>{content}</div>}
		</>
	);
}
