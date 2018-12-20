/* global tw */
import styled from 'styled-components';
import SiteLogo from '../logo';

export const Header = styled.header`
	${tw`bg-white border-brand border-t-4 clearfix`};
`;

export const Branding = styled.nav`
	${tw`block my-8`};
	${tw`md:flex`};
`;

export const Title = styled.h1`
	${tw`flex items-center justify-center mb-3`};
	${tw`md:justify-start md:mb-0 md:w-1/2`};

	a {
		display: flex;
	}
`;

export const Logo = styled(SiteLogo)`
	${tw`h-8`};
`;

export const Footer = styled.footer`
	${tw`py-10`}
`;
