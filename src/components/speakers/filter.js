import React, { Fragment } from 'react';
import Select from '../select';

export default function SpeakersFilter({
	className,
	current,
	label = 'Speakers',
	speakers,
}) {
	const speakerList = speakers.map((speaker) => ({
		value: speaker.fields.slug,
		label: `${speaker.data.lastName}, ${speaker.data.firstName}`,
	}));

	const options = [
		{
			value: '/speakers/',
			label: 'All Speakers',
		},
		{
			value: '/speakers/featured/',
			label: '★ Speakers',
		},
		...speakerList,
	];

	return (
		<Select label={label} className={className} current={current}>
			<Select.Group options={options} />
		</Select>
	);
}
