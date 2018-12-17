import React, { Fragment } from 'react';
import Speaker from './card';

export default ({ data: posts }) => (
	<Fragment>
		{posts.map(({ node: post }) => (
			<Speaker
				key={post.id}
				id={post.id}
				post={post.data}
				slug={post.fields.slug}
			/>
		))}
	</Fragment>
);
