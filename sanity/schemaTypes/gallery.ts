import { ImagesIcon } from '@sanity/icons'

import GalleryPreview from '@/components/studio/GalleryPreview'

const gallery = {
	name: 'gallery',
	title: 'Gallery',
	type: 'object',
	icon: ImagesIcon,
	fields: [
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				{
					type: 'image',
					fields: [
						{
							name: 'alt',
							title: 'Alt',
							type: 'string',
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			images: 'images',
		},
	},
	components: {
		preview: GalleryPreview,
	},
}

export default gallery
