import { string, array, arrayOf } from 'prop-types';

export const seoType = {
	description: string,
	lang: string,
	meta: array,
	keywords: arrayOf(string),
	title: string.isRequired,
};

export const seoDefaults = {
	lang: 'en',
	meta: [],
	keywords: [],
};
