import { shape, number, string, oneOfType } from 'prop-types';
import { talkType } from './talk';

export const topicType = shape({
	count: number,
	id: string.isRequired,
	name: string.isRequired,
	publishedTalksCount: oneOfType([number, string]),
	talks: talkType,
});

export const topicDefaults = {
	talks: [],
};
