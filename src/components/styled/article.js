/* global tw */
import styled from 'styled-components';
import { Section } from './layout';

export const Article = styled(Section)`
	${tw`my-8`};
	${tw`md:my-16`};
`;

export const Header = styled.header`
	${tw`mb-6`};
`;
export const Title = styled.h1`
	${tw`font-semibold mb-6 text-black text-4xl`};
`;
export const Content = styled.div`
	${tw`text-grey-darker`};

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		${tw`text-black`};
	}

	h2 {
		${tw`mt-12 mb-6`};

		&:first-child {
			${tw`mt-0`};
		}
	}

	p {
		${tw`leading-normal mb-6`};
	}

	blockquote {
		${tw`leading-normal mb-6`};
	}
`;
