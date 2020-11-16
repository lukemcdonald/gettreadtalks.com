import React from 'react';
import SubNav from '../subNav';

export default function TopicsNav({ title, topics }) {
	const links = [];

	topics.map((topic) =>
		links.push({
			text: topic.node.data.title,
			to: topic.node.fields.slug,
		})
	);

	return <SubNav title={title} links={links} />;
}
