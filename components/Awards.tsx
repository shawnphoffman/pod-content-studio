import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AWARDS_QUERY } from '@/lib/sanity/sanity.queries'

export default async function Awards() {
	const awards = await sanityFetch<SanityDocument[]>({
		query: AWARDS_QUERY,
	})
	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{awards?.length > 0 ? (
				awards.map(award => (
					<Link key={award._id} href={`/award/${award._id}`}>
						<h3 className="p-4 text-lg font-medium hover:bg-sky-50 dark:hover:bg-sky-950">{award.name}</h3>
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No awards found</div>
			)}
		</main>
	)
}
