import React from 'react';

export default function Scripture({ scripture }) {
	return (
		<blockquote>
			<p className="inline italic">{scripture.content}</p>
			<cite className="inline">{scripture.verse}</cite>
		</blockquote>
	);
}
