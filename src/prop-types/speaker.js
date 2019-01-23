import { shape, number, string, oneOfType } from 'prop-types';
import { talkType } from './talk';

export const speakerType = shape({
	description: string,
	firstName: string,
	id: string.isRequired,
	lastName: string,
	ministry: string,
	publishedTalksCount: oneOfType([number, string]),
	role: string,
	talks: talkType,
	title: string.isRequired,
	website: string,
});

export const speakerDefaults = {
	talks: [],
};
