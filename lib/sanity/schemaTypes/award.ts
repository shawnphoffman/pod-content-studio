import { ConfettiIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'award',
	title: 'Award (Beta)',
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
			name: 'linkUrl',
			title: 'Link URL',
			type: 'url',
			validation: Rule => Rule.required(),
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
			initialValue: false,
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: { type: 'category' },
		}),
		// defineField({
		//   name: 'image',
		//   title: 'Image',
		//   type: 'image',
		//   options: {
		//     hotspot: true,
		//   },
		//   fields: [
		//     {
		//       name: 'alt',
		//       type: 'string',
		//       title: 'Alternative Text',
		//     }
		//   ]
		// }),
		// defineField({
		//   name: 'bio',
		//   title: 'Bio',
		//   type: 'array',
		//   of: [
		//     {
		//       title: 'Block',
		//       type: 'block',
		//       styles: [{title: 'Normal', value: 'normal'}],
		//       lists: [],
		//     },
		//   ],
		// }),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'category.title',
			media: 'category.image',
		},
	},
})
