/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Talk from './card';

const Talks = styled.div`
	${tw`mb-20`};
`;

export default ({ data }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Talks>
			{posts.map(post => (
				<Talk
					key={post.id}
					id={post.id}
					post={post.data}
					slug={post.fields.slug}
				/>
			))}
		</Talks>
	);
};
