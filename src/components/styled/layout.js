/* global tw */
import styled from 'styled-components';
import { screens } from '../../../tailwind';

export const Container = styled('div')`
	${tw`mx-auto px-4 w-full`}

	@media (min-width: ${screens.sm}) {
		max-width: ${screens.sm};
	}

	@media (min-width: ${screens.md}) {
		max-width: ${screens.md};
	}

	@media (min-width: ${screens.lg}) {
		max-width: ${screens.lg};
	}
`;

export const Main = styled('main')`
	${tw`flex-grow bg-grey-lightest`};
`;

export const Section = styled('div')`
	${tw`mx-auto max-w-md w-full`}
`;

export const Page = styled('div')`
	${tw`app flex flex-col font-sans min-h-screen`};
`;
