import { faBold, faFlagPennant, faItalic, faLink } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const BANNER_LEVEL = [
	{ title: 'Info', value: 'info' },
	{ title: 'High Priority', value: 'priority' },
]

// https://www.sanity.io/guides/create-a-rich-string-selector-field-input

const banner = defineType({
	name: 'banner',
	type: 'object',
	title: 'Site Banner',
	description: 'A banner displayed at the top of the podcast website.',
	icon: () => <FontAwesomeIcon icon={faFlagPennant} size="xs" />,
	fields: [
		defineField({
			name: 'enabled',
			title: 'Enabled',
			description: 'Toggle the banner on or off without deleting its content.',
			type: 'boolean',
			initialValue: false,
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description: 'The main banner text.',
			type: 'string',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'notes',
			title: 'Notes',
			description: 'Optional additional details. Supports bold, italic, and links.',
			type: 'array',
			of: [
				defineArrayMember({
					title: 'Block',
					type: 'block',
					styles: [],
					lists: [],
					marks: {
						annotations: [
							{
								title: '',
								name: 'link',
								icon: <FontAwesomeIcon icon={faLink} size="xs" />,
								type: 'object',
								fields: [
									{
										title: 'URL',
										name: 'href',
										type: 'url',
									},
								],
							},
						],
						decorators: [
							{ title: 'Bold', value: 'strong', icon: <FontAwesomeIcon icon={faBold} size="xs" /> },
							{ title: 'Italic', value: 'em', icon: <FontAwesomeIcon icon={faItalic} size="xs" /> },
						],
					},
				}),
			],
			validation: Rule => Rule.required().max(200),
		}),
		defineField({
			name: 'url',
			type: 'url',
			title: 'External URL',
			description: 'Optional link — the entire banner becomes clickable.',
		}),
		defineField({
			name: 'level',
			type: 'string',
			title: 'Emphasis Level',
			description: 'Controls the visual style of the banner.',
			validation: rule => rule.required(),
			options: {
				list: BANNER_LEVEL.map(({ title, value }) => ({ title, value })),
				layout: 'radio',
			},
		}),
	],
})

export default banner
