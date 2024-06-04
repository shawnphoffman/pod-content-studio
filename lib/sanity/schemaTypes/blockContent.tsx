import { faCircle, faDroplet } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ImageIcon } from '@sanity/icons'
import { ColorWheelIcon } from '@sanity/icons'
import { Text } from '@sanity/ui'
import { defineArrayMember, defineType } from 'sanity'

import {
	ColorBlueDecorator,
	ColorGreenDecorator,
	ColorRedDecorator,
	H2Decorator,
	H3Decorator,
	H4Decorator,
	QuoteDecorator,
} from '@/components/studio/decorators/BlockContent'

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
				{ title: 'Heading 2', value: 'h2', component: H2Decorator },
				{ title: 'Heading 3', value: 'h3', component: H3Decorator },
				{ title: 'Heading 4', value: 'h4', component: H4Decorator },
				{ title: 'Quote', value: 'blockquote', component: QuoteDecorator },
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
					{
						title: 'Red',
						value: 'textRed',
						icon: () => <FontAwesomeIcon className="text-red-500" size="xs" icon={faDroplet} />,
						component: ColorRedDecorator,
					},
					{
						title: 'Blue',
						value: 'textBlue',
						icon: () => <FontAwesomeIcon className="text-blue-500" size="xs" icon={faDroplet} />,
						component: ColorBlueDecorator,
					},
					{
						title: 'Green',
						value: 'textGreen',
						icon: () => <FontAwesomeIcon className="text-green-500" size="xs" icon={faDroplet} />,
						component: ColorGreenDecorator,
					},
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
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
			icon: ImageIcon,
			options: { hotspot: true },
			fields: [
				// {
				// 	name: 'alt',
				// 	type: 'string',
				// 	title: 'Alternative Text',
				// },
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
		//
		defineArrayMember({
			type: 'gallery',
		}),
	],
})
