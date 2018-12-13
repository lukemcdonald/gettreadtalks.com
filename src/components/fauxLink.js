/* global tw */
import styled from 'styled-components';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Anchor = styled('a')`
	${tw`block pin absolute`}
`;

const FauxLink = ({ href, to, text }) => {
	return (
		<Fragment>
			{to && (
				<Anchor as={Link} to={to}>
					<span className="visuallyhidden">{text}</span>
				</Anchor>
			)}

			{href && (
				<Anchor href={href} rel="noopener noreferrer" target="_blank">
					<span className="visuallyhidden">{text}</span>
				</Anchor>
			)}
		</Fragment>
	);
};

FauxLink.propTypes = {
	href: PropTypes.string,
	to: PropTypes.string,
	text: PropTypes.string.isRequired,
};

export default FauxLink;
