import React from 'react';

import SEO from '../components/seo';
import Intro from '../components/intro';
import Section from '../components/section';

export default function NotFoundPage() {
	return (
		<>
			<SEO title="404: Not found" />

			<Intro>
				<Intro.Title>Are you lost?</Intro.Title>
				<Intro.Tagline>
					<p>
						Sorry, but the page you are looking for cannot be found nor has it
						evolved into something else.
					</p>
				</Intro.Tagline>
			</Intro>

			<Section>
				<Section.Content>
					<figure>
						<iframe
							title="Steve Lawson's Gospel Presentation"
							className="rounded"
							width="640"
							height="360"
							src="https://www.youtube.com/embed/4exu-7RDdKE"
							frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</figure>
				</Section.Content>
			</Section>
		</>
	);
}
