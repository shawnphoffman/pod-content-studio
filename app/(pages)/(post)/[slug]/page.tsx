import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QueryParams } from 'next-sanity'

import Post from '@/components/posts/Post'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POST_QUERY, POSTS_QUERY } from '@/lib/sanity/sanity.queries'
import { POST_QUERYResult, POSTS_QUERYResult } from '@/lib/sanity/sanity.types'

export async function generateStaticParams() {
	const posts = await sanityFetch<POSTS_QUERYResult>({
		query: POSTS_QUERY,
		perspective: 'published',
		stega: false,
	})

	return posts.map(post => ({
		slug: post.slug,
	}))
}

export default async function Page({ params }: { params: QueryParams }) {
	const post = await sanityFetch<POST_QUERYResult>({ query: POST_QUERY, params })
	if (!post) {
		return notFound()
	}
	return (
		<div className="flex flex-col">
			<div className="border-b border-dashed border-zinc-500 pb-4">
				<h1>Post Preview:</h1>
				<Link href="/" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
					<FontAwesomeIcon icon={faLeft} />
					<span>Back to Posts</span>
				</Link>
			</div>
			<Post post={post} />
		</div>
	)
}
