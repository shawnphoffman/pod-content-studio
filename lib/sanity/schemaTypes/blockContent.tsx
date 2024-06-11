import {
	faBold,
	faImage,
	faItalic,
	faLink,
	faListOl,
	faListUl,
	faStrikethrough,
	faUnderline,
} from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { faDroplet } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

const blockContent = defineType({
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
				{ title: 'Bullet', value: 'bullet', icon: <FontAwesomeIcon icon={faListUl} size="xs" /> },
				{ title: 'Numbered', value: 'number', icon: <FontAwesomeIcon icon={faListOl} size="xs" /> },
			],
			// Marks let you mark up inline text in the Portable Text Editor
			marks: {
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					{
						title: '',
						name: 'link',
						icon: <FontAwesomeIcon icon={faLink} size="xs" />,
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
				decorators: [
					{ title: 'Bold', value: 'strong', icon: <FontAwesomeIcon icon={faBold} size="xs" /> },
					{ title: 'Italic', value: 'em', icon: <FontAwesomeIcon icon={faItalic} size="xs" /> },
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
					{ title: 'Underline', value: 'underline', icon: <FontAwesomeIcon icon={faUnderline} size="xs" /> },
					{ title: 'Strike', value: 'strike-through', icon: <FontAwesomeIcon icon={faStrikethrough} size="xs" /> },
				],
			},
		}),
		//
		defineArrayMember({
			type: 'image',
			icon: <FontAwesomeIcon icon={faImage} size="xs" />,
			title: 'Image',
			options: { hotspot: true },
			fields: [
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
		//
		defineArrayMember({
			type: 'embed',
		}),
	],
})

export default blockContent
