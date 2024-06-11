import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'
import { PODCAST_QUERYResult } from '@/lib/sanity/sanity.types'

export default function PodcastAvatars({ podcasts }) {
	if (!podcasts) return null

	return (
		<div className="flex -space-x-6 lg:-space-x-4 rtl:space-x-reverse flex-0 justify-end items-center">
			{podcasts?.map((podcast: PODCAST_QUERYResult) => {
				if (!podcast) return <div key="0" className="w-[52px]"></div>
				return (
					<Image
						key={podcast?.image?.asset?._ref}
						src={urlForSanityImage(podcast.image).height(96).width(96).fit('crop').url()}
						className="min-w-12 min-h-12 w-12 h-full border-2 border-sky-400 aspect-square rounded-xl dark:outline-zinc-950 outline-zinc-50 outline outline-2"
						height={96}
						width={96}
						alt={''}
						title={podcast.title}
					/>
				)
			})}
		</div>
	)
}
