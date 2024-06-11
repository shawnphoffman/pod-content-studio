import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const author = defineType({
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
		defineField({
			name: 'image',
			title: 'Photo',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: rule => rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
		},
	},
})

export default author
