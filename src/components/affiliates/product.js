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

		const styled = sizeMapping[size] || sizeMapping.DEFAULT;

		if (loading) {
			return <div />;
		}

		return (
			<ConditionalWrapper
				condition={card}
				wrapper={(children) => (
					<Card className="relative bg-gray-800 border-none rounded">
						{children}
					</Card>
				)}
			>
				<div
					className={classnames(
						'flex items-center',
						card ? '' : 'flex-grow relative',
						styled.container,
						className
					)}
				>
					{post.image && (
						<figure className={classnames('w-16 mr-4', styled.image)}>
							<Image
								className="rounded-sm"
								alt={post.title}
								fluid={post.image.localFiles[0].childImageSharp.fluid}
							/>
						</figure>
					)}

					<div>
						<h3
							className={classnames(
								'text-lg font-bold leading-6',
								styled.title,
								card ? 'text-white' : ''
							)}
						>
							{post.title}
						</h3>

						{post.subtitle && (
							<p
								className={classnames(
									'mt-px text-sm inline-block text-gray-400',
									styled.subtitle
								)}
							>
								{post.subtitle}
							</p>
						)}
					</div>

					<FauxLink to={post.link.childMarkdownRemark.rawMarkdownBody}>
						{`View to ${post.title}`}
					</FauxLink>

					{disclosure && (
						<div className="absolute bottom-0 right-0 px-1 mb-1 mr-1 text-xs text-gray-900 bg-gray-400 rounded-sm">
							<Disclosure title="Affiliate" content={false} />
						</div>
					)}
				</div>
			</ConditionalWrapper>
		);
	}
}

export default Product;
