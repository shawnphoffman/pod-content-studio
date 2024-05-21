import createImageUrlBuilder from '@sanity/image-url'
import imageUrlBuilder from '@sanity/image-url'

// import type { Image } from 'sanity'
import { client } from '@/lib/sanity/sanity.client'

import { dataset, projectId } from './sanity.env'

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
})

export function urlForSanityImage(source: any) {
	return imageBuilder.image(source).auto('format')
}

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
	return builder.image(source)
}
