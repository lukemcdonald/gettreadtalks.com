/* global tw */
import styled from 'styled-components';
import React from 'react';
import classnames from 'classnames';

export const Card = styled.article`
	${tw`bg-white border border-grey-lighter border-solid flex flex-grow flex-col justify-between p-4 relative rounded-t`}
	${tw`hover:z-10 hover:border`}
	${tw`md:mb-4 md:rounded md:border`}
	${tw`lg:mb-6 lg:p-6`}
	margin-bottom: -1px;

	&:first-child {
		${tw`border-t`}
		border-top-left-radius: .25rem;
		border-top-right-radius: .25rem;
	}

	&:last-child {
		${tw`border-b`}
		border-bottom-left-radius: .25rem;
		border-bottom-right-radius: .25rem;
	}

	&.enable-hover-style {
		${tw`hover:border-brand hover:shadow-lg`}
	}

	header > :last-child {
		margin-bottom: 0;
	}
`;

export default ({ children, hoverStyle = true, ...props }) => (
	<Card
		{...props}
		className={classnames('trans', { 'enable-hover-style': hoverStyle })}
	>
		{children}
	</Card>
);
