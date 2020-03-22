/* global tw */
import styled from 'styled-components';
import React from 'react';
import Img from 'gatsby-image';

import Images from './images';
import Link from '../components/link';

const Nav = styled(`div`)`
	${tw`flex flex-wrap justify-center items-center font-semibold text-center`}
	${tw`md:w-3/4 md:justify-end`}
`;

const NavLink = styled(Link)`
	${tw`inline-block mx-2 py-2 no-underline text-black`}
	${tw`xs:mx-4`}

	&:hover,
	&.is-active {
		${tw`text-brand`}
	}
`;

const ActionLink = styled(Link)`
	${tw`block ml-2 hover:opacity-75`};
	${tw`xs:ml-4`};
`;

const FacebookImage = styled(Img)`
	${tw`w-8 h-8`}
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

		<ActionLink href="https://www.facebook.com/gettreadtalks">
			<Images>
				{images => {
					console.log(images['facebook-icon'])
					return (
						<FacebookImage
							alt="Facebook Logo"
							fluid={images['facebook-icon'].fluid}
						/>
					)
			}}
			</Images>
		</ActionLink>
	</Nav>
);
