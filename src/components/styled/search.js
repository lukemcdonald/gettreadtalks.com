/* global tw */
import styled from 'styled-components';

export default styled.div`
	${tw`leading-normal my-8 relative text-base text-left`}

	a {
		text-decoration: none;
	}

	.ais-SearchBox-form {
		${tw`relative`}
	}

	.ais-SearchBox-input {
		${tw`appearance-none bg-white block border border-transparent border-grey-lighter py-4 pr-4 pl-12 rounded w-full outline-none`}

		&:focus {
			${tw`border-brand shadow-inner`}
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

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
		${tw`hidden`}
	}

	.ais-Highlight-highlighted {
		${tw`roman text-brand`}
	}

	/* Search Results */

	.ais-Hits {
		${tw`relative z-50`}
	}

	.ais-Hits-list {
		${tw`absolute pin-t w-full bg-white border border-brand list-reset shadow-lg`}
		margin-top: -1px;
		border-bottom-left-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
	}

	.ais-Hits-item {
		${tw`relative border-b border-grey-lighter py-3 px-4`}

		&:hover {
			${tw`bg-grey-lightest`}
		}

		&:last-child {
			${tw`border-b-0 rounded-b`}
			border-bottom-left-radius: .25rem;
			border-bottom-right-radius: 0.25rem;
		}
	}
`;
