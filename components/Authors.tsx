import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AUTHORS_QUERY } from '@/lib/sanity/sanity.queries'
import { Author } from '@/lib/sanity/sanity.types'

import AuthorRow from './authors/AuthorRow'

export default async function Authors() {
	const authors = await sanityFetch<Author[]>({
		query: AUTHORS_QUERY,
	})
	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{authors?.length > 0 ? (
				authors.map(author => (
					<Link key={author._id} href={`/author/${author.slug.current}`}>
						<AuthorRow key={author._id} author={author} />
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No authors found</div>
			)}
		</main>
	)
}
