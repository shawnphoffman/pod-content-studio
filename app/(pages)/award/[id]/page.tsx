import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
// import { notFound } from 'next/navigation'
import { QueryParams } from 'next-sanity'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AWARD_QUERY } from '@/lib/sanity/sanity.queries'
import { AWARD_QUERYResult } from '@/lib/sanity/sanity.types'

// import Post from '@/components/posts/Post'
// import { sanityFetch } from '@/lib/sanity/sanity.fetch'
// import { POST_QUERY, POSTS_QUERY } from '@/lib/sanity/sanity.queries'

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

export default async function Page({ params }: { params: QueryParams }) {
	const info = await sanityFetch<AWARD_QUERYResult>({ query: AWARD_QUERY, params })
	if (!info) {
		return notFound()
	}
	return (
		<div>
			<h1>Award Preview:</h1>
			<Link href="/award" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faLeft} />
				<span>Back to Awards</span>
			</Link>

			{info && (
				<div className="mt-4 flex flex-col gap-2">
					<h2>Info</h2>
					<div className="text-xl flex flex-col gap-2">
						{/*  */}
						<div className="flex flex-row gap-2">
							<span className="font-bold text-red-500">Name:</span>
							<span>{info.name}</span>
						</div>
						{/*  */}
						<div className="flex flex-row gap-2">
							<span className="font-bold text-red-500">Podcast:</span>
							<span>{info?.category?.title || 'No assigned podcast'}</span>
						</div>
						{/*  */}
						{info.linkUrl && (
							<div className="flex flex-row gap-2 items-center">
								<span className="font-bold text-red-500">Raw Link:</span>
								<Link className="text-sm" href={info.linkUrl} target="_blank">
									{info.linkUrl}
								</Link>
							</div>
						)}
						{/*  */}
						<div className="flex flex-row gap-2">
							<span className="font-bold text-red-500">Raw Image:</span>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={info.imageUrl} alt="" className="border border-red-500" />
						</div>
						{/*  */}
						<div className="flex flex-row gap-2">
							<span className="font-bold text-red-500">Rendered Image{info.linkUrl ? ` (Linked)` : ''}:</span>
							<Link href={info.linkUrl || ''} target="_blank">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={info.imageUrl} alt="" width={info.width} height={info.height} />
							</Link>
						</div>
					</div>
				</div>
			)}

			{info && (
				<div className="mt-4 flex flex-col gap-2">
					<h2>Raw</h2>
					<pre className="text-green-500 text-xs">{JSON.stringify(info, null, 2)}</pre>
				</div>
			)}
		</div>
	)
}
