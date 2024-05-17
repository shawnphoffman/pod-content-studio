import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'category',
	title: 'Podcast',
	icon: ProjectsIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		// defineField({
		// 	name: 'description',
		// 	title: 'Description',
		// 	type: 'text',
		// }),
		defineField({
			name: 'image',
			title: 'Image',
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
			validation: Rule => Rule.required(),
		}),
	],
})
