import { ConfettiIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { AwardParserInput } from '@/components/studio/forms/AwardParserInput'

const award = defineType({
	name: 'award',
	title: 'Award',
	icon: ConfettiIcon,
	type: 'document',
	options: { canvasApp: { exclude: true } },
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
		// Auto-sync support fields. `source` tells the sync job which records
		// it owns; manual records are never touched. `externalId` is what the
		// sync upserts by - for Goodpods this is the leaderboard_id. `expiresAt`
		// gates visibility on the site; `lastSeenAt` is bookkeeping for the
		// sync job to recompute expiresAt without overwriting manual edits.
		defineField({
			name: 'source',
			title: 'Source',
			description: 'Where this award came from. Auto-synced awards are owned by the sync job and should not be edited by hand.',
			type: 'string',
			options: {
				list: [
					{ title: 'Manual', value: 'manual' },
					{ title: 'Goodpods (auto-synced)', value: 'goodpods' },
				],
				layout: 'radio',
				canvasApp: { exclude: true },
			},
			initialValue: () => 'manual',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'externalId',
			title: 'External ID',
			description: 'Identifier from the source system (e.g. Goodpods leaderboard_id). Used by the sync job to upsert without creating duplicates.',
			type: 'string',
			readOnly: ({ document }) => document?.source === 'manual',
			options: { canvasApp: { exclude: true } },
		}),
		defineField({
			name: 'expiresAt',
			title: 'Expires at',
			description: 'After this datetime the award is hidden from sites even if active is still true. Leave empty for "never expires" (typical for manual awards).',
			type: 'datetime',
			options: { canvasApp: { exclude: true } },
		}),
		defineField({
			name: 'lastSeenAt',
			title: 'Last seen at',
			description: 'Most recent sync run that observed this award. Auto-managed.',
			type: 'datetime',
			hidden: ({ document }) => document?.source !== 'goodpods',
			readOnly: true,
			options: { canvasApp: { exclude: true } },
		}),
		defineField({
			name: 'rawHtml',
			title: 'Raw Goodpods HTML',
			description: 'Paste the HTML from Goodpods here and click "Parse" below to auto-fill the remaining fields',
			type: 'text',
			hidden: ({ document }) => document?.source === 'goodpods',
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
			source: 'source',
		},
		prepare(selection) {
			const { title, frequency, source } = selection
			const prefix = frequency ? `(${frequency}) ` : ''
			const suffix = source === 'goodpods' ? '  · auto' : ''
			return { ...selection, title: `${prefix}${title || ''}${suffix}` }
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
