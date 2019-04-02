import { shape, number, string, oneOfType } from 'prop-types';
import { talkType } from './talk';

export const topicType = shape({
	count: number,
	id: string.isRequired,
	path: string,
	publishedTalksCount: oneOfType([number, string]),
	talks: talkType,
	title: string.isRequired,
});

export const topicDefaults = {
	talks: [],
};
