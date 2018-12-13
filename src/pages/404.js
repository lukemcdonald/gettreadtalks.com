/* global tw */
import styled from 'styled-components';
import React from 'react';

import DefaultLayout from '../layouts';
import SEO from '../components/seo';
import Intro from '../components/intro';

const Layout = styled(DefaultLayout)`
	${tw`bg-grey-lightest`}
`;
const Container = styled('div')`
	${tw`container pb-16 px-4 mx-auto relative -mt-24`}
`;
const Section = styled('div')`
	${tw`mx-auto max-w-md w-full`}
`;
const GospelVideo = styled('figure')`
	${tw`responsive-media aspect-16x9 mb-16 rounded overflow-hidden shadow-lg`}
`;

export default () => (
	<Layout className="bg-grey-lightest">
		<SEO title="404: Not found" />

		<Intro
			title="Are you lost?"
			text="Sorry, the page you are looking for no longer exists."
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
