import { array, shape, number, string, oneOfType } from 'prop-types';

export const speakerType = shape({
	clips: array,
	description: string,
	firstName: string,
	id: string.isRequired,
	lastName: string,
	ministry: string,
	path: string,
	publishedTalksCount: oneOfType([number, string]),
	role: string,
	talks: array,
	title: string.isRequired,
	website: string,
});

export const speakerDefaults = {
	clips: [],
	talks: [],
};
