import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AWARDS_QUERY } from '@/lib/sanity/sanity.queries'
import { AWARDS_QUERYResult } from '@/lib/sanity/sanity.types'

import PodcastAvatars from './podcasts/PodcastAvatars'

export default async function Awards() {
	const awards = await sanityFetch<AWARDS_QUERYResult>({
		query: AWARDS_QUERY,
	})

	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{awards?.length > 0 ? (
				awards.map(award => (
					<Link
						key={award.linkUrl}
						href={`/award/${award._id}`}
						className="flex flex-col items-center justify-start gap-2 p-4 py-2 transition-all rounded-lg hover:dark:bg-sky-950/50 hover:bg-sky-100/50 md:flex-row md:gap-4"
					>
						<PodcastAvatars podcasts={[award.category]} />
						<Image className="h-auto w-96 md:w-24" width={200} height={200} alt={''} src={award.imageUrl} sizes="100vw" />
						<span className="text-xl font-bold transition-colors group-hover:text-sky-400 flex-0">{award.name}</span>
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No awards found</div>
			)}
		</main>
	)
}
