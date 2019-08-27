import { array, shape, number, string, oneOfType } from 'prop-types';
// import { talkType } from './talk';

export const topicType = shape({
	count: number,
	id: string.isRequired,
	path: string,
	publishedTalksCount: oneOfType([number, string]),
	talks: array,
	title: string.isRequired,
});

export const topicDefaults = {
	talks: [],
};
