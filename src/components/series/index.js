/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import SeriesCard from './card';

const Series = styled.div`
	${tw`mb-4 lg:mg-6`};
`;

export default ({ data }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Series>
			{posts.map(({ id, fields, data }) => {
				const post = { id, ...fields, ...data };
				return <SeriesCard key={id} data={post} />;
			})}
		</Series>
	);
};
