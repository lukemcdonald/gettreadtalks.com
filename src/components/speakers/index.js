/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Speaker from './card';

const Speakers = styled.div`
	${tw`mb-4 lg:mg-6`};
`;

export default ({ data }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Speakers>
			{posts.map(({ id, fields, data }) => {
				const post = { id, ...fields, ...data };
				return <Speaker key={id} data={post} />;
			})}
		</Speakers>
	);
};
