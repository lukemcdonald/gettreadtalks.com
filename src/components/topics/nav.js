import React from 'react';
import SubNav from '../subNav';

export default function TopicsNav({ title, topics }) {
	const links = [
		{
			text: 'All Topics',
			to: '/talks/',
		},
	];

	topics.map((topic) =>
		links.push({
			text: topic.data.title,
			to: topic.fields.slug,
		})
	);

	return <SubNav title={title} links={links} />;
}
