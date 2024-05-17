import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'post',
	title: 'Post',
	icon: DocumentTextIcon,
	type: 'document',
	//
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'This is the unique URL path for the post.',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			description: 'Who wrote this post?',
			type: 'reference',
			to: { type: 'author' },
		}),
		defineField({
			name: 'categories',
			title: 'Podcasts',
			description: 'What podcasts is this relevant to? If one is not selected, the post will not be visible in the feeds.',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			// validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'mainImage',
			title: 'Main image',
			description: 'This is the main image of the post.',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				},
			],
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			description: 'This ends up on summary pages, on Google, when shared on social media, etc.',
			type: 'text',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'body',
			title: 'Body',
			description: 'This is the main content of the post.',
			type: 'blockContent',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			description: 'This controls the order of posts in the feed.',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			validation: Rule => Rule.required(),
		}),
	],
	//
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'mainImage',
			category: 'categories.0.title',
		},
		prepare(selection) {
			const { author, category } = selection
			return { ...selection, subtitle: author && `${category || 'None'} - ${author}` }
		},
	},
	//
	orderings: [
		{
			title: 'Published At, New',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
})
