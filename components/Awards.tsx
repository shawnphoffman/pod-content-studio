import Image from 'next/image'
import Link from 'next/link'

import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { urlFor } from '@/lib/sanity/sanity.image'
import { AWARDS_QUERY } from '@/lib/sanity/sanity.queries'
import { Award } from '@/lib/sanity/sanity.types'

import PodcastAvatars from './podcasts/PodcastAvatars'

export default async function Awards() {
	const awards = await sanityFetch<Award[]>({
		query: AWARDS_QUERY,
	})

	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-900">
			{awards?.length > 0 ? (
				awards.map(award => (
					<Link
						key={award.linkUrl}
						href={`/award/${award._id}`}
						className="flex flex-col items-center justify-start gap-2 p-4 py-2 transition-all rounded-lg hover:bg-sky-950/50 md:flex-row md:gap-4"
					>
						<Image
							className="h-auto w-96 md:w-24"
							width={200}
							height={200}
							alt={(award.category?.image?.alt as string) || ''}
							// src={urlFor(award.category?.image).height(200).width(200).url()}
							src={award.imageUrl}
							sizes="100vw"
						/>
						<span className="text-xl font-bold transition-colors group-hover:text-sky-400">{award.name}</span>
						<PodcastAvatars podcasts={[award.category]} />
					</Link>
				))
			) : (
				<div className="p-4 text-red-500">No awards found</div>
			)}
		</main>
	)
}
