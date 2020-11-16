import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import classnames from 'classnames';
import Section, { Content } from './section';

const IntroContent = ({ align, children, excerpt, title }) => (
	<Content className="relative sm:col-span-3" align={align}>
		{title && (
			<h1
				className="text-5xl font-bold leading-tight text-center text-white"
				dangerouslySetInnerHTML={{ __html: title }}
			/>
		)}

		{excerpt && (
			<div
				className="mt-2 text-2xl font-light text-center text-gray-400"
				dangerouslySetInnerHTML={{ __html: excerpt }}
			/>
		)}
		{children}
	</Content>
);

export default function Intro({
	align,
	children,
	className,
	image,
	excerpt,
	title,
	fullscreen,
}) {
	const imageSrc = image?.localFiles?.[0] || image;

	return (
		<section
			className={classnames('relative flex bg-gray-900', className)}
			style={{ minHeight: fullscreen ? 'calc(100vh - 116px)' : '300px' }}
		>
			{imageSrc && (
				<BackgroundImage
					alt={title}
					fluid={imageSrc?.childImageSharp?.fluid}
					className="flex items-center justify-center flex-grow"
				>
					<div className="absolute inset-0 z-0 opacity-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />

					<IntroContent title={title} excerpt={excerpt} align={align}>
						{children}
					</IntroContent>
				</BackgroundImage>
			)}

			{!imageSrc && (
				<Section
					as="div"
					className="relative flex items-center justify-center flex-grow overflow-hidden"
				>
					<IntroContent title={title} excerpt={excerpt} align={align}>
						{children}
					</IntroContent>
				</Section>
			)}
		</section>
	);
}
