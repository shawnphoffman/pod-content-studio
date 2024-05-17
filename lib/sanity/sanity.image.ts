import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from './sanity.env'

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
})

export function urlForSanityImage(source: Image) {
	return imageBuilder.image(source).auto('format')
}
