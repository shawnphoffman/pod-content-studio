// ./app/(blog)/page.tsx

import { SanityDocument } from 'next-sanity'

import Posts from '@/components/Posts'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POSTS_QUERY } from '@/lib/sanity/sanity.queries'

export default async function Page() {
	const posts = await sanityFetch<SanityDocument[]>({
		query: POSTS_QUERY,
	})

	return <Posts posts={posts} />
}
