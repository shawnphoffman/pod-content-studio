import { faGalleryThumbnails } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import GalleryPreview from '@/components/studio/GalleryPreview'

const gallery = {
	name: 'gallery',
	title: 'Gallery',
	type: 'object',
	icon: <FontAwesomeIcon icon={faGalleryThumbnails} size="xs" />,
	fields: [
		{
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				{
					type: 'image',
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
