import React, { Component } from 'react';
import Image from 'gatsby-image';

import AppleLink from './appleLink';
import Disclosure from './disclosure';
import Card from '../card';
import FauxLink from '../fauxLink';

class Product extends Component {
	state = {
		loading: true,
	};

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
				<div>
					{post.image && (
						<figure>
							<Image
								alt={post.title}
								fluid={post.image.localFiles[0].childImageSharp.fluid}
							/>
						</figure>
					)}

					<div>
						<header>
							<h2>{post.title}</h2>
							{post.subtitle && <div>{post.subtitle}</div>}
						</header>

						<footer>
							<AppleLink
								to={post.link.childMarkdownRemark.rawMarkdownBody}
								type={post.type}
							/>
						</footer>
					</div>

					<FauxLink
						to={post.link.childMarkdownRemark.rawMarkdownBody}
					>{`View to ${post.title}`}</FauxLink>
				</div>

				{disclosure && (
					<div>
						<Disclosure title="Affiliate" content={false} />
					</div>
				)}
			</Card>
		);
	}
}

export default Product;
