/* global tw */
import styled from 'styled-components';
import React from 'react';
import classnames from 'classnames';

export const Card = styled('article')`
	${tw`border border-grey-lighter border-solid flex mb-4 relative rounded trans lg:mb-6`}

	&.enable-hover-style {
		${tw`hover:border-brand hover:shadow-lg`}
	}

	header > :last-child {
		margin-bottom: 0;
	}
`;

export const CardInside = styled('div')`
	${tw`bg-white flex flex-grow flex-col justify-between p-4 relative rounded lg:p-6`}
`;

export default ({ children, hoverStyle = true, ...props }) => (
	<Card {...props} className={classnames({ 'enable-hover-style': hoverStyle })}>
		<CardInside>{children}</CardInside>
	</Card>
);
