import { shape, number, string } from 'prop-types';

export const thumbnailType = shape({
	large: shape({
		height: number,
		url: string,
		width: number,
	}),
	small: shape({
		height: number,
		url: string,
		width: number,
	}),
});
