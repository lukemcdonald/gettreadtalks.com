/* global tw */
import styled from 'styled-components';
import React from 'react';

import Layout from '../layouts';
import SEO from '../components/seo';
import Intro from '../components/intro';

import {
	Container as ContainerStyle,
	Section,
} from '../components/styled/layout';

const Container = styled(ContainerStyle)`
	${tw`pb-16 relative`}
	/* gatsby-build doesn't currently support negative margins using tw */
	margin-top: -6rem; /* -mt-24 */
`;

const GospelVideo = styled('figure')`
	${tw`bg-white mb-16 relative rounded overflow-hidden shadow-lg`}
	padding-bottom: 56.25%;

	& > iframe {
		${tw`absolute pin`};
	}
`;

export default () => (
	<Layout>
		<SEO title="404: Not found" />

		<Intro
			title="Are you lost?"
			text="Sorry, but the page you are looking for cannot be found nor has it evolved into something else."
			image={require('../assets/images/bg-intro.jpg')}
		/>

		<Container>
			<Section>
				<GospelVideo>
					<iframe
						title="Steve Lawson's Gospel Presentation"
						width="640"
						height="360"
						src="https://www.youtube.com/embed/4exu-7RDdKE"
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</GospelVideo>
			</Section>
		</Container>
	</Layout>
);
