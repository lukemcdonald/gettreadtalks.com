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
			<Card>
				<div className="flex items-center gap-6">
					{post.image && (
						<figure className="w-16">
							<Image
								alt={post.title}
								fluid={post.image.localFiles[0].childImageSharp.fluid}
							/>
						</figure>
					)}

					<div>
						<h2 className="text-xl font-bold text-black">{post.title}</h2>
						{post.subtitle && <div>{post.subtitle}</div>}

						<FauxLink to={post.link.childMarkdownRemark.rawMarkdownBody}>
							{`View to ${post.title}`}
						</FauxLink>
					</div>
				</div>

				{disclosure && (
					<div className="absolute bottom-0 right-0 px-1 -mb-px -mr-px text-xs text-white bg-gray-400">
						<Disclosure title="Affiliate" content={false} />
					</div>
				)}
			</Card>
		);
	}
}

export default Product;
