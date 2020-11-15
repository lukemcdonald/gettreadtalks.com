import React, { Component } from 'react';
import Image from 'gatsby-image';

import Card from '../card';
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
		const { data: post, disclosure } = this.props;

		if (loading) {
			return <div />;
		}

		return (
			<Card className="relative bg-gray-800 border-none">
				<div className="flex items-center">
					{post.image && (
						<figure className="w-16 mr-4">
							<Image
								alt={post.title}
								fluid={post.image.localFiles[0].childImageSharp.fluid}
							/>
						</figure>
					)}

					<div>
						<h2 className="text-xl font-bold text-white">{post.title}</h2>
						{post.subtitle && (
							<p className="text-sm text-gray-400">{post.subtitle}</p>
						)}

						<FauxLink to={post.link.childMarkdownRemark.rawMarkdownBody}>
							{`View to ${post.title}`}
						</FauxLink>
					</div>
				</div>

				{disclosure && (
					<div className="absolute bottom-0 right-0 px-1 mb-1 mr-1 text-xs text-gray-900 bg-gray-400 rounded-sm">
						<Disclosure title="Affiliate" content={false} />
					</div>
				)}
			</Card>
		);
	}
}

export default Product;
