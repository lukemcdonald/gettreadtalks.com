import React from 'react';

import SubNav from '../subNav';

export default () => {
	const links = [
		{ text: 'Latest Talks', to: '/' },
		{ text: 'Featured Talks', to: '/featured' },
		{ text: 'All Talks', to: '/archive' },
	];

	return <SubNav title="Talks Navigation" links={links} />;
};
