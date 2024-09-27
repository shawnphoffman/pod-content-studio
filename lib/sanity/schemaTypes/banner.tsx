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
	description: 'xxx',
	icon: () => <FontAwesomeIcon icon={faFlagPennant} size="xs" />,
	fields: [
		defineField({
			name: 'heading',
			title: 'Heading',
			description: 'xxx',
			type: 'string',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'notes',
			title: 'Notes',
			description: 'xxx',
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
			description: 'xxx',
		}),
		defineField({
			name: 'level',
			type: 'string',
			title: 'Emphasis Level',
			description: 'xxx',
			validation: rule => rule.required(),
			options: {
				list: BANNER_LEVEL.map(({ title, value }) => ({ title, value })),
				layout: 'radio',
			},
		}),
	],
})

export default banner
