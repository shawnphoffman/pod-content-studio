import { SanityDocument } from 'next-sanity'
import { Image, Slug } from 'sanity'

export interface SanityImage extends Image {
	alt?: string
}

export interface Author extends SanityDocument {
	name?: string
	image?: SanityImage
	slug: Slug
}

export interface Post extends SanityDocument {
	title: string
	slug: string
	mainImage?: Image
	publishedAt: string
	author: AuthorChild
	body: any
	excerpt: string
	categories?: PodcastChild[]
}

export interface Podcast extends SanityDocument {
	title: string
	description?: string
	image: SanityImage
}

export interface Award extends SanityDocument {
	name: string
	linkUrl: string
	imageUrl: string
	category: PodcastChild
}

export interface AuthorChild {
	name: string
	image: SanityImage
	slug: Slug
}

export interface PodcastChild {
	title: string
	description?: string
	image: SanityImage
}
