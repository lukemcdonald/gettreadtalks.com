import React, { Fragment } from 'react';
import Talk from './card';

export default ({ data: posts }) => {
	return (
		<Fragment>
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
		</Fragment>
	);
};
