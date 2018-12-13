/* global tw */
import styled from 'styled-components';

export const Button = styled('button')`
	${tw`border-2 font-semibold inline-block no-underline rounded-full text-inherit`}

	&:hover {
		${tw`border-black`}
	}

	${props => (props.large ? tw`sm:px-8` : tw`px-6`)};
	${props => (props.large ? tw`sm:py-3` : tw`py-2`)};
	${props => (props.large ? tw`sm:text-xl` : tw`text-base`)};
`;

export const PrimaryButton = styled(Button)`
	${tw`antialiased bg-brand border-brand text-white`}

	&:hover {
		${tw`bg-black`}
	}
`;

export const SecondayButton = styled(Button)`
	${tw`border-brand text-brand`}

	&:hover {
		${tw`text-black`}
	}
`;

export const TertiaryButton = styled(Button)`
	${tw`border-current text-grey-darker`}

	&:hover {
		${tw`border-current text-black`}
	}
`;
