import { shape, string } from 'prop-types';
import { speakerType } from './speaker';
import { talkType } from './talk';
import { topicType } from './topic';

export const clipType = shape({
	id: string.isRequired,
	link: string,
	path: string,
	speaker: string,
	speakers: speakerType,
	title: string.isRequired,
	talks: talkType,
	topics: topicType,
});

export const clipDefaults = {
	speakers: [],
	talks: [],
	topics: [],
};
