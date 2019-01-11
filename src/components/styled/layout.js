/* global tw */
import styled from 'styled-components';
import { screens } from '../../../tailwind';

export const Container = styled.div`
	${tw`mx-auto px-4 relative w-full`}

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

export const Main = styled.main`
	${tw`flex-grow`};
	${props => (props.bg ? tw`bg-${props.bg}` : tw`bg-grey-lightest`)};

	> ${Container} {
		&:last-child {
			${tw`mb-12`};
			${tw`md:mb-20 md:mt-0`};
		}
	}
`;

export const Section = styled.section`
	${tw`mx-auto max-w-md w-full`}
`;

export const SectionTitle = styled.h2`
	${tw`block no-underline my-3 py-2 text-grey-darkest text-sm tracking-wide uppercase`}
`;

export const Page = styled.div`
	${tw`flex flex-col font-sans min-h-screen`};
`;
