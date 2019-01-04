/* global tw */
import styled from 'styled-components';
import React, { Component } from 'react';

const Container = styled.div`
	${tw`mb-10 hidden md:block`};
`;

// @Link https://banners.itunes.apple.com/us/catalog
const products = [
	{
		name: 'Saints of Zion',
		id: '1264726262',
		store: 'appleMusic',
	},
	{
		name: 'Holiness of God',
		id: '562309063',
		store: 'books',
	},
];

class Apple extends Component {
	render() {
		const product = products[Math.floor(Math.random() * products.length)];

		return (
			<Container>
				<iframe
					src={`//banners.itunes.apple.com/banner.html?partnerId=&aId=&bt=catalog&t=catalog_white&id=${
						product.id
					}&c=us&l=en-US&w=728&h=90&store=${product.store}`}
					frameBorder="0"
					style={{
						overflowX: 'hidden',
						overflowY: 'hidden',
						width: '728px',
						height: '90px',
						border: '0px',
					}}
				/>
			</Container>
		);
	}
}

export default Apple;
