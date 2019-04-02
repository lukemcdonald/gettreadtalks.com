import { shape, number, string, bool } from 'prop-types';
import { seriesType } from './series';
import { speakerType } from './speaker';
import { topicType } from './topic';

export const talkType = shape({
	favorite: bool,
	id: string.isRequired,
	link: string,
	notes: string,
	scripture: string,
	series: seriesType,
	seriesOrder: number,
	path: string,
	speaker: string,
	speakers: speakerType,
	status: string,
	title: string.isRequired,
	topics: topicType,
});

export const talkDefaults = {
	series: [],
	speakers: [],
	topics: [],
};
