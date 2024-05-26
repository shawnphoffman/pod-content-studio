import { Suspense } from 'react'
import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QueryParams, SanityDocument } from 'next-sanity'

import PostRow from '@/components/posts/PostRow'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { POSTSBYAUTHOR_QUERY } from '@/lib/sanity/sanity.queries'

// export async function generateStaticParams() {
// 	const posts = await sanityFetch<SanityDocument[]>({
// 		query: POSTS_QUERY,
// 		perspective: 'published',
// 		stega: false,
// 	})

// 	return posts.map(post => ({
// 		slug: post.slug.current,
// 	}))
// }

export default async function Page({ params, searchParams }: { params: QueryParams; searchParams: { name: string } }) {
	const posts = await sanityFetch<SanityDocument>({ query: POSTSBYAUTHOR_QUERY(params.id), params })
	if (!posts) {
		return notFound()
	}
	return (
		<div>
			<h1>Author: {searchParams.name}</h1>
			<Link href="/author" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faLeft} />
				<span>Back to Authors</span>
			</Link>

			<div className="mt-4">
				<h2>Posts</h2>
				<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
					<Suspense>
						<div className="container mx-auto grid grid-cols-1 divide-y divide-zinc-200 dark:divide-zinc-700">
							{posts?.length > 0 ? (
								posts.map(post => {
									const { author, mainImage, publishedAt, slug, _id, title, categories } = post
									return (
										<Link key={post._id} href={slug}>
											<PostRow
												key={_id}
												mainImage={mainImage}
												title={title}
												publishedAt={publishedAt}
												author={author}
												podcasts={categories}
											/>
										</Link>
									)
								})
							) : (
								<div className="p-4 text-red-500">No posts found</div>
							)}
						</div>
					</Suspense>
				</div>
			</div>
		</div>
	)
}
