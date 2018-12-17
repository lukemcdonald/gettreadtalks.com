/* global tw */
import styled from 'styled-components';
import React from 'react';

import Talk from './card';

const Talks = styled.div`
	${tw`mb-20`};
`;

export default ({ data: posts }) => {
	return (
		<Talks>
			{posts.map(({ node: post }) => {
				return (
					<Talk
						key={post.id}
						id={post.id}
						post={post.data}
						slug={post.fields.slug}
					/>
				);
			})}
		</Talks>
	);
};
