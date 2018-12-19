import { shape, number, string } from 'prop-types';
import { thumbnailType } from './thumbnail';

export const attachmentType = shape({
	filename: string,
	height: number,
	id: string,
	size: number,
	thumbnails: thumbnailType,
	type: string,
	url: string,
	width: number,
});
