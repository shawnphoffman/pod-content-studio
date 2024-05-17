// ./components/Post.tsx
import { Suspense } from 'react'
import { PortableText, type PortableTextReactComponents } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import { SanityDocument } from 'next-sanity'

import PostImage from '@/components/portableText/PostImage'
import YoutubeEmbed from '@/components/portableText/YoutubeEmbed'
import { dataset, projectId } from '@/lib/sanity/sanity.env'

import styles from './PostBody.module.css'

const urlFor = (source: any) => imageUrlBuilder({ projectId, dataset }).image(source)

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => {
			return <PostImage {...value} />
		},
		youtube: ({ value }) => {
			const { url } = value
			const match = url.match(/[?&]v=([^&]+)/)
			const videoId = match ? match[1] : null
			return <YoutubeEmbed videoId={videoId} />
		},
		gallery: ({ value }) => {
			return (
				<div className="grid items-center justify-center grid-cols-2 gap-4 md:grid-cols-3">
					{value.images.map((i: any) => (
						<Suspense key={i._key}>
							<PostImage className="h-auto max-w-full rounded-lg" {...i} />
						</Suspense>
					))}
				</div>
			)
		},
	},
}

export default function Post({ post }: { post: SanityDocument }) {
	const { title, mainImage, body } = post

	return (
		<main className="container mx-auto prose prose-lg p-4">
			{title ? <h1>{title}</h1> : null}
			{mainImage ? (
				<Image
					// className="float-left m-0 w-1/3 mr-4 rounded-lg"
					className=" m-0 w-1/3 mr-4 rounded-lg"
					src={urlFor(mainImage).width(300).height(300).quality(80).url()}
					width={300}
					height={300}
					alt={mainImage.alt || ''}
				/>
			) : null}
			{body ? (
				<div className={`mx-auto max-w-3xl ${styles.portableText}`}>
					<PortableText value={body} components={myPortableTextComponents} />
				</div>
			) : null}
		</main>
	)
}
