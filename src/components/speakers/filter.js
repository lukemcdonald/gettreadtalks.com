import React from 'react';
import Select from '../select';

export default function SpeakersFilter({
	className,
	current,
	label = 'Speakers',
	speakers,
}) {
	return (
		<Select label={label} className={className} current={current}>
			<Select.Group
				options={[
					{
						value: '/speakers/',
						label: 'All Speakers',
					},
				]}
			/>

			<Select.Group
				label="Speakers"
				options={speakers.map((speaker) => ({
					value: speaker.fields.slug,
					label: `${speaker.data.lastName}, ${speaker.data.firstName}`,
				}))}
			/>
		</Select>
	);
}
