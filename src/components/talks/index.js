/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Talk from './card';

const Talks = styled.div`
	${tw`mb-4 lg:mg-6`};
`;

export default ({ data, subtitle, hideAvatar }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Talks>
			{posts.map(({ id, fields, data }) => {
				const post = { id, ...fields, ...data, subtitle, hideAvatar };
				return <Talk key={id} data={post} />;
			})}
		</Talks>
	);
};
