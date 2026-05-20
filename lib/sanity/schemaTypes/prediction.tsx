import { faCircleQuestion } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineField, defineType } from 'sanity'

const prediction = defineType({
	name: 'prediction',
	title: 'Prediction',
	type: 'object',
	icon: () => <FontAwesomeIcon icon={faCircleQuestion} size="xs" />,
	fields: [
		defineField({
			name: 'title',
			title: 'Prediction',
			description: 'The yes-or-no question being predicted, e.g. "Boba Fett makes an appearance".',
			type: 'string',
			validation: rule => rule.required(),
			options: { canvasApp: { purpose: 'The yes-or-no question being predicted on the show.' } },
		}),
		defineField({
			name: 'actualOutcome',
			title: 'Actual outcome',
			description: 'Leave blank until the prediction is resolved.',
			type: 'string',
			options: {
				list: [
					{ title: 'True', value: 'TRUE' },
					{ title: 'False', value: 'FALSE' },
				],
				layout: 'radio',
				direction: 'horizontal',
				canvasApp: { purpose: 'What actually happened: TRUE, FALSE, or unresolved.' },
			},
		}),
		defineField({
			name: 'guesses',
			title: 'Guesses',
			type: 'array',
			of: [{ type: 'predictionGuess' }],
			validation: rule => rule.min(1),
			options: { canvasApp: { purpose: 'Who guessed what for this prediction.' } },
		}),
		defineField({
			name: 'notes',
			title: 'Notes',
			description: 'Optional editor commentary shown below the guesses.',
			type: 'text',
			options: { canvasApp: { purpose: 'Optional editor commentary on this prediction.' } },
		}),
	],
	preview: {
		select: {
			title: 'title',
			actualOutcome: 'actualOutcome',
			guesses: 'guesses',
		},
		prepare(selection) {
			const { title, actualOutcome, guesses } = selection
			const count = Array.isArray(guesses) ? guesses.length : 0
			const status = actualOutcome ? `Actual: ${actualOutcome}` : 'Unresolved'
			return { title, subtitle: `${status} - ${count} guess${count === 1 ? '' : 'es'}` }
		},
	},
})

export default prediction
