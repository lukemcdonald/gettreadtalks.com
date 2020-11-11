import React from 'react';
import classnames from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import styles from './intro.module.css';
import Section, { Content } from './section';

export default function Intro({ children, image, excerpt, title }) {
	const imageSrc = image?.localFiles?.[0] || image || '';

	return (
		<>
			{imageSrc && (
				<BackgroundImage
					alt={title}
					fluid={imageSrc.childImageSharp.fluid}
					className={classnames(
						'w-full intro-bg max-h-screen-50 flex items-center justify-center',
						styles.introBg
					)}
				>
					<div className="absolute inset-0 z-0 opacity-75 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />

					<Content className="relative sm:col-span-3">
						{title && (
							<h1 className="text-5xl font-bold text-center text-white">
								{title}
							</h1>
						)}
						{excerpt && (
							<div
								className="mt-2 text-2xl font-light text-center text-gray-400"
								dangerouslySetInnerHTML={{ __html: excerpt }}
							/>
						)}
						{children}
					</Content>
				</BackgroundImage>
			)}
		</>
	);
}
