/* global tw */
import styled from 'styled-components';

export const Algolia = styled.div`
	${tw`leading-normal text-base my-8`}

	a {
		text-decoration: none;
	}

	ul,
	ol {
		${tw`list-reset`}
	}

	.ais-SearchBox-form {
		${tw`relative`}
	}

	.ais-SearchBox-input {
		${tw`appearance-none bg-white block border border-transparent border-grey-lighter py-4 pr-4 pl-12 rounded w-full outline-none`}
		${tw`focus:border-grey focus:shadow-inner`}

		&:focus + .ais-SearchBox-submit {
			${tw`text-grey-dark`}
		}
	}

	.ais-SearchBox-submit {
		${tw`absolute pin-l pin-t pin-b w-12 flex justify-center text-grey`}
		fill: currentColor;

		svg {
			${tw`w-4 h-4`}
		}
	}

	.ais-SearchBox-reset {
		display: none;
	}

	.ais-Highlight-highlighted {
		font-weight: bold;
	}
`;
