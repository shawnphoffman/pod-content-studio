import Image from 'next/image'
import Link from 'next/link'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'

interface CoverImageProps {
	title: string
	slug?: string
	image: any
	priority?: boolean
}

export default function PostCoverImage(props: CoverImageProps) {
	const { title, slug, image: source, priority } = props

	if (!source) return null

	const image = source?.asset?._ref ? (
		<div className="shadow-small">
			<Image
				className="h-auto w-full"
				width={2000}
				height={1000}
				alt={source.alt || ''}
				src={urlForSanityImage(source).height(1000).width(2000).url()}
				sizes="100vw"
				priority={priority}
			/>
		</div>
	) : (
		<div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
	)

	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	)
}
