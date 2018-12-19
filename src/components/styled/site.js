/* global tw */
import styled from 'styled-components';
import SiteLogo from '../logo';

export const Header = styled.header`
	${tw`bg-white border-brand border-t-4 clearfix`};
`;

export const Branding = styled.nav`
	${tw`block my-4`};
	${tw`md:flex`};
`;

export const Title = styled.h1`
	${tw`flex justify-center items-center`};
	${tw`md:justify-start md:w-1/2`};
`;

export const Logo = styled(SiteLogo)`
	${tw`h-8`};
`;

export const Footer = styled.footer`
	${tw`py-10`}
`;
