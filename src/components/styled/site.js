/* global tw */
import styled from 'styled-components';
import Logo from '../logo';

export const SiteHeader = styled('header')`
	${tw`bg-white border-brand border-t-4 clearfix pt-1`};
`;

export const SiteBranding = styled('nav')`
	${tw`block my-4`};
	${tw`md:flex`};
`;

export const SiteTitle = styled('h1')`
	${tw`flex justify-center items-center`};
	${tw`md:justify-start md:w-1/2`};
`;

export const SiteLogo = styled(Logo)`
	${tw`h-8`};
`;
