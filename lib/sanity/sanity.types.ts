/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
	_type: 'sanity.imagePaletteSwatch'
	background?: string
	foreground?: string
	population?: number
	title?: string
}

export type SanityImagePalette = {
	_type: 'sanity.imagePalette'
	darkMuted?: SanityImagePaletteSwatch
	lightVibrant?: SanityImagePaletteSwatch
	darkVibrant?: SanityImagePaletteSwatch
	vibrant?: SanityImagePaletteSwatch
	dominant?: SanityImagePaletteSwatch
	lightMuted?: SanityImagePaletteSwatch
	muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions'
	height?: number
	width?: number
	aspectRatio?: number
}

export type SanityFileAsset = {
	_id: string
	_type: 'sanity.fileAsset'
	_createdAt: string
	_updatedAt: string
	_rev: string
	originalFilename?: string
	label?: string
	title?: string
	description?: string
	altText?: string
	sha1hash?: string
	extension?: string
	mimeType?: string
	size?: number
	assetId?: string
	uploadId?: string
	path?: string
	url?: string
	source?: SanityAssetSourceData
}

export type Geopoint = {
	_type: 'geopoint'
	lat?: number
	lng?: number
	alt?: number
}

export type Gallery = {
	_type: 'gallery'
	images?: Array<{
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
		_key: string
	}>
}

export type Youtube = {
	_type: 'youtube'
	url?: string
}

export type Award = {
	_id: string
	_type: 'award'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name: string
	linkUrl: string
	imageUrl: string
	active: boolean
	category?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'category'
	}
}

export type BlockContent = Array<
	| {
			children?: Array<{
				marks?: Array<string>
				text?: string
				_type: 'span'
				_key: string
			}>
			style?: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote'
			listItem?: 'bullet' | 'number'
			markDefs?: Array<{
				href?: string
				_type: 'link'
				_key: string
			}>
			level?: number
			_type: 'block'
			_key: string
	  }
	| {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			caption?: string
			_type: 'image'
			_key: string
	  }
	| ({
			_key: string
	  } & Youtube)
	| ({
			_key: string
	  } & Gallery)
>

export type Category = {
	_id: string
	_type: 'category'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title: string
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
}

export type Post = {
	_id: string
	_type: 'post'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title: string
	slug: Slug
	author: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'author'
	}
	categories?: Array<{
		_ref: string
		_type: 'reference'
		_weak?: boolean
		_key: string
		[internalGroqTypeReferenceTo]?: 'category'
	}>
	mainImage?: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
	excerpt: string
	body: BlockContent
	publishedAt: string
}

export type Author = {
	_id: string
	_type: 'author'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name: string
	slug: Slug
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
}

export type SanityImageCrop = {
	_type: 'sanity.imageCrop'
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export type SanityImageHotspot = {
	_type: 'sanity.imageHotspot'
	x?: number
	y?: number
	height?: number
	width?: number
}

export type SanityImageAsset = {
	_id: string
	_type: 'sanity.imageAsset'
	_createdAt: string
	_updatedAt: string
	_rev: string
	originalFilename?: string
	label?: string
	title?: string
	description?: string
	altText?: string
	sha1hash?: string
	extension?: string
	mimeType?: string
	size?: number
	assetId?: string
	uploadId?: string
	path?: string
	url?: string
	metadata?: SanityImageMetadata
	source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
	_type: 'sanity.assetSourceData'
	name?: string
	id?: string
	url?: string
}

export type SanityImageMetadata = {
	_type: 'sanity.imageMetadata'
	location?: Geopoint
	dimensions?: SanityImageDimensions
	palette?: SanityImagePalette
	lqip?: string
	blurHash?: string
	hasAlpha?: boolean
	isOpaque?: boolean
}

export type Slug = {
	_type: 'slug'
	current: string
	source?: string
}
export declare const internalGroqTypeReferenceTo: unique symbol


// Source: lib/sanity/sanity.queries.ts
// Variable: POSTS_QUERY
// Query: *[_type == "post"] | order(date desc, publishedAt desc) {	  _id,  _updatedAt,  title,  date,	publishedAt,  excerpt,  mainImage,  "slug": slug.current,  "author": author->{name, image},	"categories": categories[]->{title, image},}
export type POSTS_QUERYResult = Array<{
	_id: string
	_updatedAt: string
	title: string
	date: null
	publishedAt: string
	excerpt: string
	mainImage: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	} | null
	slug: string
	author: {
		name: string
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			_type: 'image'
		}
	}
	categories: Array<{
		title: string
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			_type: 'image'
		}
	}> | null
}>

// Variable: POST_QUERY
// Query: *[_type == "post" && slug.current == $slug][0]{	body,	  _id,  _updatedAt,  title,  date,	publishedAt,  excerpt,  mainImage,  "slug": slug.current,  "author": author->{name, image},	"categories": categories[]->{title, image},}
export type POST_QUERYResult = {
	body: BlockContent
	_id: string
	_updatedAt: string
	title: string
	date: null
	publishedAt: string
	excerpt: string
	mainImage: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	} | null
	slug: string
	author: {
		name: string
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			_type: 'image'
		}
	}
	categories: Array<{
		title: string
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			_type: 'image'
		}
	}> | null
} | null

// Variable: PODCASTS_QUERY
// Query: *[_type == "category"]
export type PODCASTS_QUERYResult = Array<{
	_id: string
	_type: 'category'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title: string
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
}>

// Variable: PODCAST_QUERY
// Query: *[_type == "category" && _id == $id][0]
export type PODCAST_QUERYResult = {
	_id: string
	_type: 'category'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title: string
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
} | null

// Variable: AUTHORS_QUERY
// Query: *[_type == "author"]
export type AUTHORS_QUERYResult = Array<{
	_id: string
	_type: 'author'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name: string
	slug: Slug
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
}>

// Variable: AUTHOR_QUERY
// Query: *[_type == "author" && slug.current == $slug][0]
export type AUTHOR_QUERYResult = {
	_id: string
	_type: 'author'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name: string
	slug: Slug
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		alt?: string
		_type: 'image'
	}
} | null

// Variable: AWARDS_QUERY
// Query: *[_type == "award"]{		_id,	name,	imageUrl,	linkUrl,	"category": category->{title, image}}
export type AWARDS_QUERYResult = Array<{
	_id: string
	name: string
	imageUrl: string
	linkUrl: string
	category: {
		title: string
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			_type: 'image'
		}
	} | null
}>

// Variable: AWARD_QUERY
// Query: *[_type == "award" && _id == $id][0] {		_id,	name,	imageUrl,	linkUrl,	"category": category->{title, image}}
export type AWARD_QUERYResult = {
	_id: string
	name: string
	imageUrl: string
	linkUrl: string
	category: {
		title: string
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			alt?: string
			_type: 'image'
		}
	} | null
} | null


