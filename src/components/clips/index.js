/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Clip from './card';

const Clips = styled.div`
	${tw`mb-4 lg:mg-6`};
`;

export default ({ data }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Clips>
			{posts.map(({ id, fields, data }) => {
				const post = { id, ...fields, ...data };
				return <Clip key={id} data={post} />;
			})}
		</Clips>
	);
};
