/* global tw */
import styled from 'styled-components';

export const Box = styled.div`
	${tw`bg-white border border-grey-lighter border-solid flex flex-grow flex-col justify-between p-4 relative rounded-t`}
	${tw`hover:z-10 hover:border`}
	${tw`md:mb-4 md:rounded md:border`}
	${tw`lg:mb-6 lg:p-6`}
`
