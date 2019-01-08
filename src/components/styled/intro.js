/* global tw */
import styled from 'styled-components';
import Img from 'gatsby-image';

import { screens } from '../../../tailwind';
import { Container } from './layout';

export const IntroMedia = styled.figure`
	${tw`h-full object-cover overflow-hidden relative`}

	img {
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

export const IntroImageOverlay = styled.span`
	${tw`absolute bg-grey-lightest opacity-75 pin`}
`;

export const IntroBody = styled(Container)`
	${tw`py-8 relative`}
	${tw`md:py-16`}

	&& {
		${tw`max-w-lg`}
	}

	a {
		${tw`no-underline`}

		&:hover {
			${tw`text-brand`}
		}
	}

	> :last-child {
		${tw`mb-0`}
	}
`;

export const IntroTitle = styled.h1`
	${tw`font-semibold mb-4 text-4xl text-black md:text-5xl`}
`;

export const IntroExcerpt = styled.div`
	${tw`leading-normal max-w-md m-auto`}
	${tw`md:text-2xl`}
`;

export const IntroContent = styled(IntroExcerpt)``;

export const Intro = styled.div`
	${tw`bg-cover bg-grey-lightest text-center text-grey-darkest`}
	display: grid;
	grid-template-areas: 'intro';
	align-items: center;

	${IntroMedia},
	${IntroBody} {
		grid-area: intro;
	}

	@media (min-width: ${screens.md}) {
		&.has-bg {
			&,
			${IntroImage} {
				min-height: 360px;
			}

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
	}
`;
