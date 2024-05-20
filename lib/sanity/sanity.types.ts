import { SanityDocument } from 'next-sanity'
import { Image, Slug } from 'sanity'

export interface Author extends SanityDocument {
	name?: string
	image?: Image
	slug: Slug
}

export interface Post extends SanityDocument {
	title: string
	slug: string
	mainImage?: Image
	publishedAt: string
	author: {
		name?: string
		image?: Image
		slug: string
	}
	body: any
	excerpt: string
	categories?: {
		title: string
		description?: any[]
		image?: Image
	}[]
}

export interface Podcast extends SanityDocument {
	title: string
	description?: string
	image: Image
}

export interface Award extends SanityDocument {
	name: string
	linkUrl?: string
	imageUrl?: string
	category?: {
		title: string
		description?: any[]
		image?: Image
	}
}
