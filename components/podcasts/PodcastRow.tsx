import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/lib/sanity/sanity.image'
import { PODCASTS_QUERYResult } from '@/lib/sanity/sanity.types'

type Props = {
	podcast: PODCASTS_QUERYResult[number]
}

export default function PodcastRow({ podcast }: Props) {
	return (
		<div className="flex flex-col items-center gap-1 p-4 py-2 transition-all rounded-lg hover:dark:bg-sky-950/50 hover:bg-sky-100/50 md:flex-row md:gap-4">
			{podcast.image && (
				<Image
					className="h-auto w-full md:w-24 max-md:max-w-48"
					width={200}
					height={200}
					alt={podcast.title || ''}
					src={urlFor(podcast.image).height(200).width(200).url()}
					sizes="100vw"
				/>
			)}
			<div className="py-2 text-lg font-medium flex-1">{podcast.title}</div>
			{podcast.webUrl && (
				<Link className="hover:text-sky-500" href={podcast.webUrl}>
					{podcast.webUrl.replace('https://', '').replace('/', '')}
				</Link>
			)}
		</div>
	)
}
