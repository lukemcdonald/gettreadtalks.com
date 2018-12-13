import React from 'react';
import classnames from 'classnames';

import Card from './Card';
import CardAvatar from './CardAvatar';
import Loader from './Loader';

const CardHolder = ({ loading, repeat = 1, title }) => {
	const { animation, color, size } = loading;
	let cards = [];

	for (let step = 0; step < repeat; step++) {
		let opacity = step * 20 - 100;

		cards.push(
			<Card key={step} style={{ opacity: opacity / -100 }} hoverStyle={false}>
				<div
					className={classnames('relative flex items-center', {
						'animate-pulse': 'pulse' === animation,
					})}
				>
					<CardAvatar />

					<div className="flex-grow">
						{title ? (
							<div className="w-2/3 mb-2 font-bold text-grey-lighter text-xl">
								{title}
							</div>
						) : (
							<div className="w-2/3 bg-grey-lighter h-6 mb-2">&nbsp;</div>
						)}

						<div className="w-1/3 bg-grey-lighter h-3">&nbsp;</div>
					</div>

					{(color || size) && 0 === step && (
						<div className="absolute pin-t pin-r">
							<Loader color={color} size={size} text={title} />
						</div>
					)}
				</div>
			</Card>
		);
	}

	return cards;
};

export default CardHolder;
