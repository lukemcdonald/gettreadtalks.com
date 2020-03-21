/* global tw */
import styled from 'styled-components';
import React from 'react';

import Link from '../components/link';
import { PrimaryButton } from './styled/button';

const Nav = styled(`div`)`
	${tw`block font-semibold text-center `}
	${tw`md:w-3/4 md:text-right`}
`;

const NavLink = styled(Link)`
	${tw`inline-block mx-4 py-2 no-underline text-black`}

	&:hover,
	&.is-active {
		${tw`text-brand`}
	}
`;

const SubscribeButton = styled(PrimaryButton)`
	${tw`block mt-3`};
	${tw`xs:inline-block`};
	${tw`sm:mt-0`};
	${tw`md:ml-4`}
`;

const links = [
	{ label: 'About', path: '/about/' },
	{ label: 'Clips', path: '/clips/' },
	{ label: 'Speakers', path: '/speakers/' },
	{ label: 'Talks', path: '/talks/' },
	{ label: 'Topics', path: '/topics/' },
];

export default () => (
	<Nav>
		{links.map(link => (
			<NavLink key={link.label} to={link.path} activeClassName="is-active">
				{link.label}
			</NavLink>
		))}
		<SubscribeButton as="a" href="http://eepurl.com/dNtF3U">
			Subscribe
		</SubscribeButton>
	</Nav>
);
