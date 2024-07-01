import { ConfettiIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { AwardParserInput } from '@/components/studio/forms/AwardParserInput'

const award = defineType({
	name: 'award',
	title: 'Award',
	icon: ConfettiIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'category',
			title: 'Podcast',
			type: 'reference',
			to: { type: 'category' },
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
			name: 'rawHtml',
			title: 'Raw Goodpods HTML',
			description: 'Paste the HTML from Goodpods here and click "Parse" below to auto-fill the remaining fields',
			type: 'text',
		}),
		defineField({
			name: 'frequency',
			title: 'Frequency',
			description: 'Optional frequency of the award, e.g. "Weekly" or "Monthly"',
			type: 'text',
			components: {
				input: AwardParserInput,
			},
		}),
		defineField({
			name: 'name',
			title: 'Name',
			type: 'text',
			validation: Rule => Rule.required(),
			components: {
				input: AwardParserInput,
			},
		}),
		defineField({
			name: 'linkUrl',
			title: 'Link URL',
			type: 'url',
			components: {
				input: AwardParserInput,
			},
		}),
		defineField({
			name: 'imageUrl',
			title: 'Image URL',
			type: 'url',
			validation: Rule => Rule.required(),
			components: {
				input: AwardParserInput,
			},
		}),
		defineField({
			name: 'width',
			title: 'Image Width',
			description: 'Do not change this by hand unless you know what you are doing',
			type: 'number',
			components: {
				input: AwardParserInput,
			},
		}),
		defineField({
			name: 'height',
			title: 'Image Height',
			description: 'Do not change this by hand unless you know what you are doing',
			type: 'number',
			components: {
				input: AwardParserInput,
			},
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'category.title',
			media: 'category.image',
			frequency: 'frequency',
		},
		prepare(selection) {
			const { title, frequency } = selection
			return { ...selection, title: `${frequency ? `(${frequency}) ` : ''}${title || ''}` }
		},
	},
	orderings: [
		{
			title: 'Podcast',
			name: 'podcast',
			by: [{ field: 'category.title', direction: 'asc' }],
		},
	],
})

export default award
