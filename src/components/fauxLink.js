/* global tw */
import styled from 'styled-components';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

const Link = styled(GatsbyLink)`
	${tw`block pin absolute`}
`;

const FauxLink = ({ href, to, text }) => {
	return (
		<Fragment>
			{to && (
				<Link to={to}>
					<span className="visuallyhidden">{text}</span>
				</Link>
			)}

			{href && (
				<Link as="a" href={href} rel="noopener noreferrer" target="_blank">
					<span className="visuallyhidden">{text}</span>
				</Link>
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
