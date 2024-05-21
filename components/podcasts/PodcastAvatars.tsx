import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'
import { PodcastChild } from '@/lib/sanity/sanity.types'

export default function PodcastAvatars({ podcasts }) {
	if (!podcasts) return null

	console.log('podcasts', podcasts)

	return (
		<div className="flex -space-x-4 rtl:space-x-reverse flex-1 justify-end items-center">
			{podcasts?.map((podcast: PodcastChild) => {
				return (
					<Image
						key={podcast?.image?.asset?._ref}
						src={urlForSanityImage(podcast.image).height(96).width(96).fit('crop').url()}
						className="w-12 h-12 border-2 rounded-full"
						height={96}
						width={96}
						alt={podcast.image.alt || ''}
						title={podcast.title}
					/>
				)
			})}
		</div>
	)
}
