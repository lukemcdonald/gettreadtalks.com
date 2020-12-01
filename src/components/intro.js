import React, { Component } from 'react';
import classnames from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import Section from './section';

import styles from './intro.module.css';

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

		const imageSrc = image?.localFiles?.[0] || image;

		return (
			<section
				className={classnames(
					'relative flex bg-gray-900',
					bgGradient ? styles.bgGradient : '',
					className
				)}
				style={{ minHeight: fullscreen ? 'calc(100vh - 116px)' : '300px' }}
			>
				{imageSrc && (
					<BackgroundImage
						alt="Intro background image"
						fluid={imageSrc?.childImageSharp?.fluid}
						className="flex items-center justify-center flex-grow"
					>
						<div className="absolute inset-0 z-0 opacity-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />

						<Section.Content
							className="relative px-4 sm:col-span-3"
							align={align}
						>
							{children}
						</Section.Content>
					</BackgroundImage>
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
