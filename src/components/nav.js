/* global tw */
import styled from 'styled-components';

import React from 'react';
import { Link } from 'gatsby';

const links = [
	{ label: 'About', path: '/about' },
	{ label: 'Speakers', path: '/speakers' },
	{ label: 'Talks', path: '/talks' },
	{ label: 'Topics', path: '/topics' },
];

const Nav = styled(`div`)`
	${tw`block text-center font-semibold md:w-1/2 md:text-right`}
`;

const NavLink = styled(Link)`
	${tw`inline-block mr-8 py-6 no-underline text-black hover:text-brand`}

	&:hover,
	&.is-active {
		${tw`font-bold text-brand`}
	}
`;

export default () => (
	<Nav>
		{links.map(link => (
			<NavLink
				key={link.label}
				to={link.path}
				className="inline-block mr-8 py-6 no-underline text-black hover:text-brand"
				activeClassName="is-active"
			>
				{link.label}
			</NavLink>
		))}
		<a href="http://eepurl.com/dNtF3U" className="button button--primary">
			Subscribe
		</a>
	</Nav>
);
