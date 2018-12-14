import React, { Fragment } from 'react';
import Talk from './card';

export default ({ data: posts }) => (
	<Fragment>
		{posts.map(({ node: post }) => (
			<Talk key={post.id} post={post.data} slug={post.fields.slug} />
		))}
	</Fragment>
);
