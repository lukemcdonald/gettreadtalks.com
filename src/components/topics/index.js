/* global tw */
import styled from 'styled-components';
import React from 'react';
import { flattenObjectsByKey } from '../../utils';

import Topic from './card';

const Topics = styled.div`
	${tw`mb-20`};
`;

export default ({ data }) => {
	const posts = flattenObjectsByKey(data, 'node');

	return (
		<Topics>
			{posts.map(post => (
				<Topic
					key={post.id}
					id={post.id}
					post={post.data}
					slug={post.fields.slug}
				/>
			))}
		</Topics>
	);
};
