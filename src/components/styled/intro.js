/* global tw */
import styled from 'styled-components';
import Img from 'gatsby-image';

import { screens } from '../../../tailwind';
import { Container } from './layout';

export const IntroMedia = styled('figure')`
	${tw`h-full object-cover relative`}

	img {
		object-fit: cover;
		filter: grayscale(100%);
	}

	@media (min-width: ${screens.md}) {
		max-height: 50vh;
	}
`;

export const IntroImage = styled(Img)`
	${tw`h-full opacity-75 w-full`}
	${tw`md:h-auto`}
`;

export const IntroImageOverlay = styled('span')`
	${tw`absolute bg-grey-lightest opacity-75 pin`}
`;

export const IntroBody = styled(Container)`
	${tw`py-16 relative`}

	&& {
		${tw`max-w-md`}
	}
`;

export const IntroTitle = styled('h1')`
	${tw`font-semibold mb-4 text-4xl text-black md:text-5xl`}
`;

export const IntroText = styled('div')`
	${tw`md:text-2xl leading-normal`}
`;

export const Intro = styled('div')`
	${tw`bg-cover bg-grey-lightest overflow-hidden text-center text-grey-darkest`}

	display: grid;
	grid-template-areas: 'intro';
	align-items: center;

	${IntroMedia},
	${IntroBody} {
		grid-area: intro;
	}

	&.has-bg {
		> div {
			${tw`mb-16`}
		}

		+ div {
			/* gatsby-build doesn't currently support negative margins using tw */
			/* ${tw`-mt-10`} */
			margin-top: -1.5rem;
		}

		+ .has-subnav {
			/* gatsby-build doesn't currently support negative margins using tw */
			/* ${tw`-mt-24`} */
			margin-top: -6rem;
		}
	}

	@media (min-width: ${screens.md}) {
		.has-bg {
			min-height: 360px;
		}
	}
`;
