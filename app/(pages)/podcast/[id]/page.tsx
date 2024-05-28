import { Suspense } from 'react'
import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QueryParams, SanityDocument } from 'next-sanity'

import PostRow from '@/components/posts/PostRow'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { PODCAST_QUERY, POSTSBYPOD_QUERY } from '@/lib/sanity/sanity.queries'
import { PODCAST_QUERYResult } from '@/lib/sanity/sanity.types'

// export async function generateStaticParams() {
// 	const posts = await sanityFetch<SanityDocument[]>({
// 		query: POSTSBYPOD_QUERY(),
// 		perspective: 'published',
// 		stega: false,
// 	})

// 	return posts.map(post => ({
// 		slug: post.slug.current,
// 	}))
// }

export default async function Page({ params, searchParams }: { params: QueryParams; searchParams: { title: string } }) {
	const infoPromise = sanityFetch<PODCAST_QUERYResult>({ query: PODCAST_QUERY, params })
	const postsPromise = sanityFetch<SanityDocument>({ query: POSTSBYPOD_QUERY(searchParams.title), params })

	const [info, posts] = await Promise.all([infoPromise, postsPromise])

	return (
		<div>
			<h1>Podcast: {searchParams.title}</h1>
			<Link href="/podcast" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faLeft} />
				<span>Back to Podcasts</span>
			</Link>

			{info && (
				<div className="mt-4 flex flex-col gap-2">
					<h2>Info</h2>
					<div className="text-xl flex flex-col gap-2">
						{info.webUrl && (
							<div className="flex flex-row gap-2">
								<span className="font-bold text-red-500">Website:</span>
								<Link target="_blank" href={info.webUrl} className="text-sky-400 hover:text-yellow-400">
									{info.webUrl}
								</Link>
							</div>
						)}
						{info.webUrlDev && (
							<div className="flex flex-row gap-2">
								<span className="font-bold text-red-500">Dev Website:</span>
								<Link target="_blank" href={info.webUrlDev} className="text-sky-400 hover:text-yellow-400">
									{info.webUrlDev}
								</Link>
							</div>
						)}
					</div>
				</div>
			)}

			<div className="mt-4 flex flex-col gap-2">
				<h2>Posts</h2>
				<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
					<Suspense>
						<div className="container mx-auto grid grid-cols-1 divide-y divide-zinc-200 dark:divide-zinc-700">
							{posts.length === 0 && <div className="text-center">No posts found</div>}
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

			{info && (
				<div className="mt-4 flex flex-col gap-2">
					<h2>Raw</h2>
					<pre className="text-green-500 text-xs">{JSON.stringify(info, null, 2)}</pre>
				</div>
			)}
		</div>
	)
}
