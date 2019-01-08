/* global tw */
import styled from 'styled-components';

export const Button = styled.button`
	${tw`border-2 inline-block rounded-full text-base text-inherit`}

	&& {
		${tw`font-semibold no-underline px-4 py-2 text-center`}
	}

	&:hover {
		${tw`border-black`}
	}

	${props => (props.large ? tw`sm:px-8` : null)};
	${props => (props.large ? tw`sm:py-4` : null)};
	${props => (props.large ? tw`sm:text-xl` : null)};
`;

export const PrimaryButton = styled(Button)`
	${tw`antialiased bg-brand border-brand text-white`}

	&:hover {
		${tw`bg-black`}
	}
`;

export const SecondaryButton = styled(Button)`
	${tw`border-black bg-black text-white`}

	&&:hover {
		${tw`border-grey-darkest bg-grey-darkest text-white`}
	}
`;

export const TertiaryButton = styled(Button)`
	${tw`border-brand text-brand`}

	&&:hover {
		${tw`text-black`}
	}
`;
