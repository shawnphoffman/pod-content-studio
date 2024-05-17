// ./app/(blog)/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { QueryParams, SanityDocument } from 'next-sanity'

import Post from '@/components/Post'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POST_QUERY, POSTS_QUERY } from '@/lib/sanity/sanity.queries'

export async function generateStaticParams() {
	const posts = await sanityFetch<SanityDocument[]>({
		query: POSTS_QUERY,
		perspective: 'published',
		stega: false,
	})

	return posts.map(post => ({
		slug: post.slug.current,
	}))
}

export default async function Page({ params }: { params: QueryParams }) {
	const post = await sanityFetch<SanityDocument>({ query: POST_QUERY, params })
	if (!post) {
		return notFound()
	}
	return <Post post={post} />
}
