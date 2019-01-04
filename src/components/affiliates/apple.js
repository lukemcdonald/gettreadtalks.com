/* global tw */
import styled from 'styled-components';
import React, { Component } from 'react';

const Container = styled.div`
	${tw`mb-10 hidden md:block`};
`;

class Apple extends Component {
	render() {
		return (
			<Container>
				<iframe
					src="//banners.itunes.apple.com/banner.html?partnerId=&aId=&bt=catalog&t=catalog_white&id=1264726262&c=us&l=en-US&w=728&h=90&store=appleMusic"
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
