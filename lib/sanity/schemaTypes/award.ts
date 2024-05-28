import { ConfettiIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'award',
	title: 'Award',
	icon: ConfettiIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Podcast',
			type: 'reference',
			to: { type: 'category' },
		}),
		defineField({
			name: 'linkUrl',
			title: 'Link URL',
			type: 'url',
			// validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'imageUrl',
			title: 'Image URL',
			type: 'url',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'active',
			title: 'Active',
			description: 'Is this award currently active and visible?',
			type: 'boolean',
			initialValue: () => false,
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'width',
			title: 'Image Width',
			description: 'Do not change this unless you know what you are doing',
			type: 'number',
			// validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'height',
			title: 'Image Height',
			description: 'Do not change this unless you know what you are doing',
			type: 'number',
			// validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'category.title',
			media: 'category.image',
		},
	},
})
