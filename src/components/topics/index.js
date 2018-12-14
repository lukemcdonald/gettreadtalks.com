import React, { Fragment } from 'react';
import Topic from './card';

export default ({ data: posts }) => (
	<Fragment>
		{posts.map(({ node: post }) => (
			<Topic
				key={post.id}
				id={post.id}
				post={post.data}
				slug={post.fields.slug}
			/>
		))}
	</Fragment>
);
