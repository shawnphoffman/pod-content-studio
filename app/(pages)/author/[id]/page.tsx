import { Suspense } from 'react'
import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QueryParams, SanityDocument } from 'next-sanity'

import PostAuthor from '@/components/posts/PostAuthor'
import PostRow from '@/components/posts/PostRow'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AUTHOR_QUERY, POSTSBYAUTHOR_QUERY } from '@/lib/sanity/sanity.queries'
import { AUTHOR_QUERYResult } from '@/lib/sanity/sanity.types'

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
	const author = await sanityFetch<AUTHOR_QUERYResult>({ query: AUTHOR_QUERY, params })
	if (!author) {
		return notFound()
	}
	return (
		<div>
			<h1>Author: {searchParams.name}</h1>
			<Link href="/author" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faLeft} />
				<span>Back to Authors</span>
			</Link>

			{author && (
				<div className="mt-4 flex flex-col gap-2">
					<h2>Info</h2>
					<div className="text-xl flex flex-col gap-2">
						{/* {author.name && (
							<div className="flex flex-row gap-2">
								<span className="font-bold text-red-500">Name:</span>
								<span className="text-sky-400 hover:text-yellow-400">{author.name}</span>
							</div>
						)} */}
						<PostAuthor author={author} />
					</div>
				</div>
			)}

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

			{author && (
				<div className="mt-4 flex flex-col gap-2">
					<h2>Raw</h2>
					<pre className="text-green-500 text-xs">{JSON.stringify(author, null, 2)}</pre>
				</div>
			)}
		</div>
	)
}
