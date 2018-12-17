/* global tw */
import styled from 'styled-components';
import React from 'react';

import Link from './link';

const LinkStyle = styled(Link)`
	${tw`block pin absolute`}
`;

const FauxLink = ({ children, to, ...other }) => (
	<LinkStyle to={to} {...other}>
		<span className="visuallyhidden">{children}</span>
	</LinkStyle>
);

export default FauxLink;
