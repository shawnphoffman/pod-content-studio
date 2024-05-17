'use client'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client as sanityClient } from '@/sanity/sanity.client'

interface PostImageProps {
	asset: SanityImageSource
	alt: string
	caption?: string
}

const PostImage = (props: PostImageProps) => {
	const { asset, alt, caption } = props

	const imageProps = useNextSanityImage(sanityClient, asset)

	if (!imageProps) return null

	return (
		<figure>
			<Image
				alt={alt}
				//
				sizes="(max-width: 800px) 100vw, 800px"
				className="mw-full h-auto"
				{...imageProps}
			/>
			{caption && (
				<figcaption className="mt-2 text-center italic text-sm text-zinc-400 text-pretty">
					{/*  */}
					{caption}
				</figcaption>
			)}
		</figure>
	)
}

export default PostImage
