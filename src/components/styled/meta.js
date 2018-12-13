/* global tw */
import styled from 'styled-components';
import { Link } from 'gatsby';

export const MetaText = styled('span')`
	${tw`text-grey-dark text-xs tracking-wider uppercase`}
`;

export const MetaLink = styled(Link)`
	${tw`no-underline hover:text-brand`}
`;

export const MetaSep = styled('span')`
	${tw`italic lowercase`}
`;
