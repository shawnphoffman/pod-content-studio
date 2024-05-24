import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'author',
	title: 'Author',
	icon: UserIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: rule => rule.required().max(50),
		}),
		// defineField({
		// 	name: 'slug',
		// 	title: 'Slug',
		// 	type: 'slug',
		// 	description: 'This is the unique URL path for the post. Just click "Generate" until I can automate it.',
		// 	options: {
		// 		source: 'name',
		// 		maxLength: 96,
		// 		isUnique: (value, context) => context.defaultIsUnique(value, context),
		// 	},
		// 	validation: rule => rule.required(),
		// }),
		defineField({
			name: 'image',
			title: 'Photo',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: rule => rule.required(),
		}),
		// defineField({
		// 	name: 'bio',
		// 	title: 'Bio',
		// 	type: 'array',
		// 	of: [
		// 		{
		// 			title: 'Block',
		// 			type: 'block',
		// 			styles: [{ title: 'Normal', value: 'normal' }],
		// 			lists: [],
		// 		},
		// 	],
		// }),
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
		},
	},
})
