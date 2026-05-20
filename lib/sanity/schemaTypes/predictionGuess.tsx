import { defineField, defineType } from 'sanity'

const predictionGuess = defineType({
	name: 'predictionGuess',
	title: 'Guess',
	type: 'object',
	fields: [
		defineField({
			name: 'predictor',
			title: 'Predictor (Author)',
			description: 'Pick from the existing author list. Leave blank to enter a one-off guest name below.',
			type: 'reference',
			to: [{ type: 'author' }],
			options: { canvasApp: { purpose: 'Which author (used as predictor) made this guess.' } },
		}),
		defineField({
			name: 'guestName',
			title: 'Guest name',
			description: 'Only used when no predictor is selected (one-off guests).',
			type: 'string',
			hidden: ({ parent }) => Boolean(parent?.predictor),
			options: { canvasApp: { purpose: 'One-off guest predictor name (when not in the predictor list).' } },
		}),
		defineField({
			name: 'pick',
			title: 'Pick',
			type: 'string',
			options: {
				list: [
					{ title: 'True', value: 'TRUE' },
					{ title: 'False', value: 'FALSE' },
				],
				layout: 'radio',
				direction: 'horizontal',
				canvasApp: { purpose: 'What this predictor guessed: TRUE or FALSE.' },
			},
			validation: rule => rule.required(),
		}),
	],
	validation: rule =>
		rule.custom(value => {
			if (!value) return true
			const v = value as { predictor?: unknown; guestName?: string }
			if (!v.predictor && !v.guestName) {
				return 'Either pick a predictor or enter a guest name.'
			}
			return true
		}),
	preview: {
		select: {
			predictorName: 'predictor.name',
			guestName: 'guestName',
			pick: 'pick',
			media: 'predictor.image',
		},
		prepare(selection) {
			const { predictorName, guestName, pick, media } = selection
			const title = predictorName || guestName || 'Unknown'
			return { title, subtitle: pick ? `Picked ${pick}` : 'No pick', media }
		},
	},
})

export default predictionGuess
