/* global tw */
import styled from 'styled-components';
import React from 'react';

const Disclosure = styled.div`
	${tw`relative`};
`;

const Title = styled.div`
	${tw`text-xs`};
`;

const Content = styled.div`
	${tw`text-base w-full p-6 bg-grey-lightest`};
`;

export default props => {
	const {
		title = 'Ad',
		content = `We may earn a small commission for this endorsement, recommendation,
		testimonial, and/or link to any products or services from this website.
		Your purchase helps support the site.`,
	} = props;

	return (
		<Disclosure>
			{title && <Title>{title}</Title>}
			{content && <Content>{content}</Content>}
		</Disclosure>
	);
};
