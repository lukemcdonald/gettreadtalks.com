/* global tw */
import styled from 'styled-components';

import React from 'react';
import { Link } from 'gatsby';

const Menu = styled.ul`
	${tw`list-reset flex`};
`;

const MenuLink = styled(Link)`
	${tw`font-semibold inline-block mr-8 my-3 py-2 no-underline text-sm tracking-wide trans uppercase text-grey-darkest`}

	&:hover {
		${tw`text-brand`}
	}

	&.is-active {
		${tw`font-bold text-black `}

		&:hover {
			${tw`text-black `}
		}
	}
`;

const links = [
	{ label: 'Latest Talks', path: '/' },
	{ label: 'Featured Talks', path: '/talks/featured' },
	{ label: 'All Talks', path: '/talks' },
];

export default () => (
	<nav>
		<h2 className="visuallyhidden">Talks Navigation</h2>
		<Menu>
			{links.map(link => (
				<MenuLink key={link.label} to={link.path} activeClassName="is-active">
					{link.label}
				</MenuLink>
			))}
		</Menu>
	</nav>
);
