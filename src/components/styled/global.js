/* global tw */
import { createGlobalStyle } from 'styled-components';
import tailwindPreflight from '../../../node_modules/tailwindcss/dist/preflight.min.css';

export const GlobalStyles = createGlobalStyle`
	${tailwindPreflight}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	html {
		box-sizing: border-box;
		font-family: sans-serif;
	}

	html,
	body {
		${tw`min-h-screen`};
	}

	body {
		${tw`font-sans relative text-base`};
	}

	a {
		${tw`text-inherit`};
	}

	figure {
		${tw`m-0`}
	}

	.aspect-16x9 {
		padding-bottom: 56.25%;
	}

	a,
	.trans {
		transition-duration: 0.25s;
		transition-property: all;
		transition-timing-function: ease-in-out;
	}

	.visuallyhidden {
		border: 0;
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute !important;
		width: 1px;
		word-wrap: normal !important;
	}

	.responsive-media {
		position: relative;
		overflow: hidden;
		padding-top: 56.25%;

		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 0;
		}
	}
`;
