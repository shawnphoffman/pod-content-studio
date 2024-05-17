import { defineArrayMember, defineType } from 'sanity'

export default defineType({
	title: 'Block Content',
	name: 'blockContent',
	type: 'array',
	of: [
		defineArrayMember({
			title: 'Block',
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				// { title: 'Heading 1', value: 'h1' },
				{ title: 'Heading 2', value: 'h2' },
				{ title: 'Heading 3', value: 'h3' },
				{ title: 'Heading 4', value: 'h4' },
				{ title: 'Quote', value: 'blockquote' },
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
			],
			// Marks let you mark up inline text in the Portable Text Editor
			marks: {
				decorators: [
					{ title: 'Bold', value: 'strong' },
					{ title: 'Italic', value: 'em' },
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
					// { title: 'Code', value: 'code' },
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					{
						title: 'URL',
						name: 'link',
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
			},
		}),
		//
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				},
				{
					name: 'caption',
					type: 'string',
					title: 'Image caption',
					description: 'Caption displayed below the image.',
				},
			],
		}),
		//
		defineArrayMember({
			type: 'youtube',
		}),
	],
})
