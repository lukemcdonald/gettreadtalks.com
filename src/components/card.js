import React, { Component } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { sanitizeHTMLTag } from '../utilities';
import Avatar from './avatar';

export const CardTitle = ({ children, className, as }) => {
	const Tag = sanitizeHTMLTag(as, ['h1', 'h2', 'h3']);

	return (
		<Tag className={classnames('text-xl font-bold leading-6', className)}>
			{children}
		</Tag>
	);
};

export const CardSubTitle = ({ children, className, as }) => {
	const Tag = sanitizeHTMLTag(as, ['h2', 'h3']);

	return (
		<Tag
			className={classnames(
				'text-red-600 text-xs tracking-wide uppercase mb-2 mt-1 font-bold',
				className
			)}
		>
			{children}
		</Tag>
	);
};

export const CardMeta = ({ children, className }) => (
	<div className={classnames('mt-1 text-sm text-gray-500', className)}>
		{children}
	</div>
);

export const CardMetaLink = ({ children, className, to }) => (
	<Link
		to={to}
		className={classnames('relative z-50 hover:underline', className)}
	>
		{children}
	</Link>
);

export const CardAvatar = ({ image, title }) => (
	<figure className="w-16 h-16 mr-4">
		<Avatar className="w-16 h-16 rounded-full" image={image} alt={title} />
	</figure>
);

export default class Card extends Component {
	static Title = CardTitle;

	static SubTitle = CardSubTitle;

	static Meta = CardMeta;

	static MetaLink = CardMetaLink;

	static Avatar = CardAvatar;

	render() {
		const { children, className } = this.props;

		return (
			<article
				className={classnames(
					'relative flex items-center flex-grow p-4 text-gray-700 transition duration-300 bg-white border border-gray-300 hover:z-10 hover:border-red-600 hover:shadow-lg',
					className
				)}
			>
				{children}
			</article>
		);
	}
}
