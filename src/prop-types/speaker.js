import { shape, number, string, oneOfType } from 'prop-types';
import { attachmentType } from './attachment';
import { talkType } from './talk';

export const speakerType = shape({
	banner: attachmentType,
	description: string,
	firstName: string,
	id: string.isRequired,
	lastName: string,
	ministry: string,
	name: string.isRequired,
	publishedTalksCount: oneOfType([number, string]),
	role: string,
	talks: talkType,
	website: string,
});

export const speakerDefaults = {
	banner: [],
	talks: [],
};
