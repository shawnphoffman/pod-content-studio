import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POSTS_QUERY } from '@/lib/sanity/sanity.queries'

import PostRow from './posts/PostRow'

export default async function Posts() {
	const posts = await sanityFetch<SanityDocument[]>({
		query: POSTS_QUERY,
	})
	return (
		<div className="container mx-auto grid grid-cols-1 divide-y divide-zinc-700">
			{posts?.length > 0 ? (
				posts.map(post => {
					const { author, mainImage, publishedAt, slug, _id, title } = post
					return (
						<Link key={post._id} href={slug}>
							<PostRow key={_id} mainImage={mainImage} title={title} publishedAt={publishedAt} author={author} />
						</Link>
					)
				})
			) : (
				<div className="p-4 text-red-500">No posts found</div>
			)}
		</div>
	)
}
