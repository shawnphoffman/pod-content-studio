import { faBold, faFlagPennant, faItalic, faLink } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { apiVersion } from '../sanity.env'

const BANNER_LEVEL = [
	{ title: 'Info', value: 'info' },
	{ title: 'High Priority', value: 'priority' },
]

const siteBanner = defineType({
	name: 'siteBanner',
	type: 'document',
	title: 'Site Banner',
	icon: () => <FontAwesomeIcon icon={faFlagPennant} size="xs" />,
	fields: [
		defineField({
			name: 'enabled',
			title: 'Enabled',
			description: 'Toggle the banner on or off without deleting its content.',
			type: 'boolean',
			initialValue: false,
			validation: rule =>
				rule.custom(async (enabled, context) => {
					if (!enabled) return true

					const { document, getClient } = context
					if (!document) return true

					const podcasts = (document.podcasts as Array<{ _ref: string }>) ?? []
					const podcastRefs = podcasts.map(p => p._ref).filter(Boolean)
					if (podcastRefs.length === 0) return true

					const client = getClient({ apiVersion })
					const conflicts = await client.fetch<Array<{ _id: string; title: string }>>(
						`*[_type == "siteBanner" && enabled == true && _id != $id && count(podcasts[_ref in $refs]) > 0]{ _id, title }`,
						{
							id: document._id.replace(/^drafts\./, ''),
							refs: podcastRefs,
						}
					)

					if (conflicts.length > 0) {
						const names = conflicts.map(c => `"${c.title}"`).join(', ')
						return `Another active banner already targets one of these podcasts: ${names}. Disable it first.`
					}

					return true
				}),
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description: 'Internal name for this banner (not shown on the site).',
			type: 'string',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'podcasts',
			title: 'Podcasts',
			description: 'Which podcast sites should display this banner.',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'category' }] }],
			validation: rule => rule.required().min(1),
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description: 'The main banner text displayed on the site.',
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
								title: 'Link',
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
			initialValue: 'info',
			options: {
				list: BANNER_LEVEL.map(({ title, value }) => ({ title, value })),
				layout: 'radio',
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			enabled: 'enabled',
			podcast0: 'podcasts.0.title',
			podcast1: 'podcasts.1.title',
			podcast2: 'podcasts.2.title',
		},
		prepare({ title, enabled, podcast0, podcast1, podcast2 }) {
			const pods = [podcast0, podcast1, podcast2].filter(Boolean)
			const subtitle = pods.length > 0 ? pods.join(', ') : 'No podcasts assigned'
			return {
				title: `${enabled ? '🟢' : '⚫'} ${title ?? 'Untitled Banner'}`,
				subtitle,
			}
		},
	},
	orderings: [
		{
			title: 'Enabled first',
			name: 'enabledFirst',
			by: [
				{ field: 'enabled', direction: 'desc' },
				{ field: '_updatedAt', direction: 'desc' },
			],
		},
	],
})

export default siteBanner
