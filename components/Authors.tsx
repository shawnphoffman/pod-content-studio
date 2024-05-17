import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

export default function Authors({ authors }: { authors: SanityDocument[] }) {
	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{authors?.length > 0 ? (
				authors.map(author => (
					<Link key={author._id} href={`/author/${author.slug.current}`}>
						<h3 className="p-4 text-lg font-medium hover:bg-sky-50 dark:hover:bg-sky-950">{author.name}</h3>
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No authors found</div>
			)}
		</main>
	)
}
