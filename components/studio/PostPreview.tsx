import { Suspense } from 'react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'

import PostImage from '../portableText/PostImage'
import UrlEmbed from '../portableText/UrlEmbed'
import YoutubeEmbed from '../portableText/YoutubeEmbed'
import styles from '../posts/Post.module.css'
import PostCoverImage from '../posts/PostCoverImage'
import PostTitle from '../posts/PostTitle'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
	marks: {
		textRed: ({ children }) => {
			return <span className="text-red-500">{children}</span>
		},
		textBlue: ({ children }) => {
			return <span className="text-sky-500">{children}</span>
		},
		textGreen: ({ children }) => {
			return <span className="text-green-500">{children}</span>
		},
		underline: ({ children }) => {
			return <span className="underline underline-offset-2 decoration-red-500">{children}</span>
		},
		'strike-through': ({ children }) => {
			return <span className="line-through decoration-sky-500 decoration-2">{children}</span>
		},
	},
	types: {
		image: ({ value }) => {
			return <PostImage {...value} />
		},
		embed: ({ value }) => {
			return <UrlEmbed {...value} />
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

const PostPreview = ({ document }) => {
	const post = document?.displayed

	const { title, mainImage, body } = post

	return (
		<div className="m-8">
			<div className="flex flex-col items-center justify-center gap-4 px-2 my-2  bg-zinc-950/90">
				<PostTitle>{title}</PostTitle>

				{/* <PostAuthor author={post.author} /> */}

				<PostCoverImage title={title} image={mainImage} priority />

				<article className="w-full mb-8 text-left rounded-lg bg-zinc-950/90">
					{body ? (
						<div className={`mx-auto max-w-3xl ${styles.portableText}`}>
							<Suspense>
								<PortableText value={body} components={myPortableTextComponents} />
							</Suspense>
						</div>
					) : null}
				</article>
			</div>
		</div>
	)
}

export default PostPreview
