/* global tw */
import styled from 'styled-components';
import React, { Component } from 'react';
import Image from 'gatsby-image';
import { screens } from '../../../tailwind';

import AppleLink from './appleLink';
import Disclosure from './disclosure';
import Card from '../card';
import FauxLink from '../fauxLink';

const Container = styled.div`
	${tw`flex text-left`}
	${tw`sm:items-center`}
`;

const Body = styled.div`
	${tw`flex-grow `}
	${tw`sm:flex sm:justify-between`}
`;

const Title = styled.h2`
	${tw`font-bold mb-1 text-black text-xl`}
`;

const Subtitle = styled.div`
	${tw`text-base text-grey-dark`};
`;

const Figure = styled.figure`
	${tw`h-auto mr-4 overflow-hidden w-16`}
	${tw`sm:bg-grey-lighter`}

	/* gatsby-build doesn't currently support negative margins using tw */
	@media (min-width: ${screens.lg}) {
		margin-top: -0.75rem;
		margin-bottom: -0.75rem;
		margin-left: -0.5rem;
	}
`;

const Footer = styled.footer`
	${tw`block mt-3`};
	${tw`sm:mt-0`};

	a {
		display: block;
		min-height: 41px;
	}
`;

const Badge = styled.div`
	${tw`absolute pin-b pin-r bg-grey-light text-white px-2 leading-normal`};
	margin: -1px;
`;

class Product extends Component {
	state = {
		post: {},
		loading: true,
		disclosure: true,
	};

	componentDidMount() {
		const { data, disclosure } = this.props;

		this.setState({
			post: data,
			disclosure: disclosure ? true : false,
			loading: false,
		});
	}

	render(props) {
		const { post, loading, disclosure } = this.state;
		// const { data: post, disclosure } = this.props;

		if (loading) {
			return <div />;
		}

		return (
			<Card>
				<Container>
					{post.image && (
						<Figure>
							<Image
								alt={post.title}
								fluid={post.image.localFiles[0].childImageSharp.fluid}
							/>
						</Figure>
					)}

					<Body>
						<header>
							<Title>{post.title}</Title>
							{post.subtitle && <Subtitle>{post.subtitle}</Subtitle>}
						</header>

						<Footer>
							<AppleLink to={post.link} type={post.type} />
						</Footer>
					</Body>

					<FauxLink to={`${post.link}`}>{`View to ${post.title}`}</FauxLink>
				</Container>

				{disclosure && (
					<Badge>
						<Disclosure title="Affiliate" content={false} />
					</Badge>
				)}
			</Card>
		);
	}
}

export default Product;
