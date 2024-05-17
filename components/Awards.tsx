import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

export default function Awards({ awards }: { awards: SanityDocument[] }) {
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
