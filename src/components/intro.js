import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';

import {
	Intro,
	IntroMedia,
	IntroImage,
	IntroImageOverlay,
	IntroBody,
	IntroTitle,
	IntroText,
} from './styled/intro';

export default ({ image, text, title }) => (
	<Intro className={classnames({ 'has-bg': image })}>
		{image && (
			<IntroMedia>
				{image.localFiles && (
					<IntroImage
						alt={title}
						fluid={image.localFiles[0].childImageSharp.fluid}
					/>
				)}

				<IntroImageOverlay />
			</IntroMedia>
		)}

		<IntroBody>
			{title && <IntroTitle>{title}</IntroTitle>}
			{text && <IntroText dangerouslySetInnerHTML={{ __html: text }} />}
		</IntroBody>
	</Intro>
);

export const pageQuery = graphql`
	query {
		file(relativePath: { eq: "bg-intro.jpg" }) {
			childImageSharp {
				id
				fluid {
					tracedSVG
				}
			}
		}
	}
`;
