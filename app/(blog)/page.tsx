import { faBars } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SanityDocument } from 'next-sanity'

import Sidebar from '@/components/core/Sidebar'
import Posts from '@/components/Posts'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POSTS_QUERY } from '@/lib/sanity/sanity.queries'

export default async function Page() {
	const posts = await sanityFetch<SanityDocument[]>({
		query: POSTS_QUERY,
	})

	return (
		<>
			<h1>Posts</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Posts posts={posts} />
			</div>
		</>
	)
}
