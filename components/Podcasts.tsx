import Link from 'next/link'
import { SanityDocument } from 'next-sanity'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { PODCASTS_QUERY } from '@/lib/sanity/sanity.queries'

import PodcastRow from './podcasts/PodcastRow'

export default async function Authors() {
	const podcasts = await sanityFetch<SanityDocument[]>({
		query: PODCASTS_QUERY,
	})
	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{podcasts?.length > 0 ? (
				podcasts.map(podcast => (
					<Link key={podcast._id} href={`/podcasts/${podcast._id}`}>
						<PodcastRow key={podcast._id} podcast={podcast} />
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No podcasts found</div>
			)}
		</main>
	)
}
