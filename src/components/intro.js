import React from 'react';
import classnames from 'classnames';

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
				<IntroImage
					alt={title}
					fluid={image.localFiles[0].childImageSharp.fluid}
				/>
				<IntroImageOverlay />
			</IntroMedia>
		)}

		<IntroBody>
			{title && <IntroTitle>{title}</IntroTitle>}
			{text && <IntroText dangerouslySetInnerHTML={{ __html: text }} />}
		</IntroBody>
	</Intro>
);
