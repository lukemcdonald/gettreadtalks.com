/* global tw */
import styled from 'styled-components';
import React from 'react';

import Topic from './card';

const Topics = styled.div`
	${tw`mb-20`};
`;

export default ({ data: posts }) => (
	<Topics>
		{posts.map(({ node: post }) => (
			<Topic
				key={post.id}
				id={post.id}
				post={post.data}
				slug={post.fields.slug}
			/>
		))}
	</Topics>
);
