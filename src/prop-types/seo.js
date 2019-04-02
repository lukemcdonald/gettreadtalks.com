import { string, array, arrayOf } from 'prop-types';

export const seoType = {
	description: string,
	image: string,
	keywords: arrayOf(string),
	lang: string,
	meta: array,
	pathname: string,
	title: string.isRequired,
};

export const seoDefaults = {
	description: null,
	image: null,
	keywords: [],
	lang: 'en',
	meta: [],
	pathname: null,
	title: null,
};
