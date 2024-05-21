import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POSTS_QUERY } from '@/lib/sanity/sanity.queries'
import { POSTS_QUERYResult } from '@/lib/sanity/sanity.types'

import PostRow from './posts/PostRow'

export default async function Posts() {
	const posts = await sanityFetch<POSTS_QUERYResult>({
		query: POSTS_QUERY,
	})

	return (
		<div className="container mx-auto grid grid-cols-1 divide-y divide-zinc-700">
			{posts?.length > 0 ? (
				posts.map(post => {
					const { author, mainImage, publishedAt, slug, _id, title, categories } = post
					return (
						<Link key={post._id} href={slug}>
							<PostRow key={_id} mainImage={mainImage} title={title} publishedAt={publishedAt} author={author} podcasts={categories} />
						</Link>
					)
				})
			) : (
				<div className="p-4 text-red-500">No posts found</div>
			)}
		</div>
	)
}
