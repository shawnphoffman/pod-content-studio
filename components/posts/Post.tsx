import { Suspense } from 'react'
import { PortableText, type PortableTextReactComponents } from '@portabletext/react'

import PostImage from '@/components/portableText/PostImage'
import YoutubeEmbed from '@/components/portableText/YoutubeEmbed'
import { POST_QUERYResult } from '@/lib/sanity/sanity.types'

import styles from './Post.module.css'
import PostAuthor from './PostAuthor'
import PostCoverImage from './PostCoverImage'
import PostTitle from './PostTitle'

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

export default function Post({ post }: { post: POST_QUERYResult }) {
	if (!post) return null

	const { title, mainImage, body } = post

	return (
		<div className="flex flex-col items-center justify-center gap-4 border border-zinc-500 m-4">
			<PostTitle>{title}</PostTitle>

			<PostAuthor author={post.author} />

			<PostCoverImage title={title} image={mainImage} priority />

			<article className="w-full mb-8 text-left rounded-lg bg-zinc-950/90">
				{body ? (
					<div className={`mx-auto max-w-3xl ${styles.portableText}`}>
						<PortableText value={body} components={myPortableTextComponents} />
					</div>
				) : null}
			</article>
		</div>
	)
}
