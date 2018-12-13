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
	<Intro>
		{image && (
			<IntroMedia>
				<IntroImage src={image} alt={title} />
				<IntroImageOverlay />
			</IntroMedia>
		)}

		<IntroBody>
			{title && <IntroTitle>{title}</IntroTitle>}

			{text && <IntroText dangerouslySetInnerHTML={{ __html: text }} />}
		</IntroBody>
	</Intro>
);
