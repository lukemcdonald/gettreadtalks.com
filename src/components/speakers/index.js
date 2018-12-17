/* global tw */
import styled from 'styled-components';
import React from 'react';

import Speaker from './card';

const Speakers = styled.div`
	${tw`mb-20`};
`;

export default ({ data: posts }) => (
	<Speakers>
		{posts.map(({ node: post }) => (
			<Speaker
				key={post.id}
				id={post.id}
				post={post.data}
				slug={post.fields.slug}
			/>
		))}
	</Speakers>
);
