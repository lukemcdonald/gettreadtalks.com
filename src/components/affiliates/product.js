import React, { Component } from 'react';
import Image from 'gatsby-image';
import classnames from 'classnames';

import Card from '../card';
import ConditionalWrapper from '../wrapper';
import Disclosure from './disclosure';
import FauxLink from '../fauxLink';

class Product extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		// Prevent affiliate links from not updating when page is refreshed.
		// Not sure why this needs to be done exactly but does fix the issue
		// on the live site or during `npm run serve`
		this.setState({
			loading: false,
		});
	}

	render() {
		const { loading } = this.state;
		const {
			data: post,
			className,
			disclosure = true,
			size,
			card = false,
		} = this.props;

		const sizeMapping = {
			DEFAULT: {
				container: '',
				image: '',
				title: 'text-lg',
				subtitle: '',
			},
			large: {
				container: '',
				image: '',
				title: 'text-xl',
				subtitle: '',
			},
		};

		const sizeStyles = sizeMapping[size] || sizeMapping.DEFAULT;

		if (loading) {
			return <div />;
		}

		return (
			<ConditionalWrapper
				condition={card}
				wrapper={(children) => (
					<Card className="relative border-none rounded">{children}</Card>
				)}
			>
				<div
					className={classnames(
						'flex items-center',
						card ? '' : 'flex-grow relative',
						sizeStyles.container,
						className
					)}
				>
					{post.image && (
						<figure className={classnames('w-16 mr-4', sizeStyles.image)}>
							<Image
								className={card ? 'rounded' : 'rounded-l'}
								alt={post.title}
								fluid={post.image.localFiles[0].childImageSharp.fluid}
							/>
						</figure>
					)}

					<div>
						<h3
							className={classnames(
								'text-lg font-bold leading-6',
								sizeStyles.title
							)}
						>
							{post.title}
						</h3>

						{post.subtitle && (
							<p
								className={classnames(
									'mt-px text-sm inline-block text-gray-400',
									sizeStyles.subtitle
								)}
							>
								{post.subtitle}
							</p>
						)}
					</div>

					<FauxLink to={post.link.childMarkdownRemark.rawMarkdownBody}>
						{`View to ${post.title}`}
					</FauxLink>

					{disclosure && <Disclosure title="Affiliate" />}
				</div>
			</ConditionalWrapper>
		);
	}
}

export default Product;
