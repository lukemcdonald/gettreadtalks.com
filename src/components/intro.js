import React, { Component } from 'react';
import classnames from 'classnames';

import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import Section from './section';

export const IntroTitle = ({ children, className, size }) => {
	const sizeMapping = {
		DEFAULT: '',
		large: 'lg:text-5xl lg:leading-tight lg:font-bold',
	};

	return (
		<h1
			className={classnames(
				'text-4xl font-medium text-center text-white',
				sizeMapping[size] || sizeMapping.DEFAULT,
				className
			)}
		>
			{children}
		</h1>
	);
};

export const IntroTagline = ({ children, className }) => (
	<div
		className={classnames('mt-2 text-2xl font-light text-gray-400', className)}
	>
		{children}
	</div>
);

export default class Intro extends Component {
	static Title = IntroTitle;

	static Tagline = IntroTagline;

	render() {
		const {
			align,
			bgGradient,
			children,
			className,
			image,
			fullscreen,
		} = this.props;

		const imageSrc =
			image?.childImageSharp?.gatsbyImageData ||
			image?.localFiles[0]?.childImageSharp?.gatsbyImageData;

		return (
			<section
				className={classnames(
					'relative flex bg-gray-900 text-center',
					bgGradient ? 'bg-image-gradient' : '',
					className
				)}
				style={{ minHeight: fullscreen ? 'calc(100vh - 116px)' : '300px' }}
			>
				{imageSrc && (
					<>
						<div>
							<div className="absolute inset-0">
								<GatsbyImage image={imageSrc} alt="Intro background image" />
							</div>

							<div className="absolute inset-0 opacity-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />
						</div>

						<Section
							as="div"
							className="flex items-center justify-center flex-grow"
						>
							<Section.Content
								className="relative px-4 sm:col-span-3"
								align={align}
							>
								{children}
							</Section.Content>
						</Section>
					</>
				)}

				{!imageSrc && (
					<Section
						as="div"
						className="flex items-center justify-center flex-grow overflow-hidden "
					>
						<Section.Content className="px-4 sm:col-span-3" align={align}>
							{children}
						</Section.Content>
					</Section>
				)}
			</section>
		);
	}
}
