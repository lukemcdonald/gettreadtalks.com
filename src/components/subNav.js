/* global tw */
import styled from 'styled-components';
import React from 'react';
import Link from './link';

const Title = styled.h2`
	${tw``};
`;

const Menu = styled.ul`
	${tw`list-reset flex`};
`;

const MenuItem = styled.li`
	${tw`mr-8 my-3 font-semibold inline-block py-2`};

	&:last-child {
		${tw`mr-0`};
	}
`;

const MenuLink = styled(Link)`
	${tw`block no-underline text-grey-darkest text-sm tracking-wide uppercase`}

	&:hover {
		${tw`text-black`}
	}

	&.is-active {
		${tw`font-bold text-brand `}
	}
`;

const Nav = styled('nav')`
	${Menu} {
		${props => (props.justify ? tw`justify-between` : tw``)}
	}
`;

export default ({ title, links = [], ...other }) => (
	<Nav {...other}>
		{title && <Title className="visuallyhidden">{title}</Title>}

		<Menu>
			{links.map(link => (
				<MenuItem key={link.to}>
					<MenuLink to={link.to}>{link.text}</MenuLink>
				</MenuItem>
			))}
		</Menu>
	</Nav>
);
