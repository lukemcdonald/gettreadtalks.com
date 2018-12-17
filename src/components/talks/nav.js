import React from 'react';

import SubNav from '../subNav';

export default () => {
	const links = [
		{ text: 'Latest Talks', to: '/' },
		{ text: 'Featured Talks', to: '/talks/featured' },
		{ text: 'All Talks', to: '/talks' },
	];

	return <SubNav title="Talks Navigation" links={links} />;
};
