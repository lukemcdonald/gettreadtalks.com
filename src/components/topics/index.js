/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Topic from './card';

const Topics = styled.div`
	${tw`mb-8`};
`;

export default ({ data }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Topics>
			{posts.map(({ id, fields, data }) => {
				const post = { id, ...fields, ...data };
				return <Topic key={id} data={post} />;
			})}
		</Topics>
	);
};
