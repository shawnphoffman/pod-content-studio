import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
// import { notFound } from 'next/navigation'
import { QueryParams, SanityDocument } from 'next-sanity'

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
	// const post = await sanityFetch<SanityDocument>({ query: POST_QUERY, params })
	// if (!post) {
	// 	return notFound()
	// }
	return (
		<div>
			<h1>Award Preview:</h1>
			<Link href="/award" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faLeft} />
				<span>Back to Awards</span>
			</Link>
			{/* <Post post={post} /> */}
		</div>
	)
}
