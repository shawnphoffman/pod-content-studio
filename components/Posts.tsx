import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

export default function Posts({ posts }: { posts: SanityDocument[] }) {
	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{posts?.length > 0 ? (
				posts.map(post => (
					<Link key={post._id} href={post.slug.current}>
						<h3 className="p-4 text-lg font-medium hover:bg-sky-50 dark:hover:bg-sky-950">{post.title}</h3>
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No posts found</div>
			)}
		</main>
	)
}
