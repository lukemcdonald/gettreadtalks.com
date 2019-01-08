/* global tw */
import styled from 'styled-components';
import Link from '../link';

export const MetaText = styled.span`
	${tw`text-grey-dark text-xs tracking-wider uppercase`}
`;

export const MetaLink = styled(Link)`
	${tw`no-underline hover:text-brand relative z-10`}
`;

export const MetaSep = styled.span`
	${tw`italic lowercase`}
`;
