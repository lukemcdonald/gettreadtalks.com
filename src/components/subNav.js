/* global tw */
import styled from 'styled-components';
import React from 'react';
import Link from './link';

const Title = styled.h2``;

const Menu = styled.ul`
	${tw`flex list-reset justify-center`};
	${tw`lg:justify-start`}
`;

const MenuItem = styled.li`
	${tw`mx-4 my-3 font-semibold py-2`};

	&:first-child {
		${tw`ml-0`};
	}

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

const Nav = styled.nav`
	${Menu} {
		${props => (props.justify ? tw`justify-between` : null)}
	}

	${MenuItem} {
		&:last-child {
			${props => (props.justify ? tw`text-right` : null)}
		}
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
