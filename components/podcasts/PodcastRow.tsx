// import PostAuthor from '../posts/PostAuthor'

import Image from 'next/image'

import { urlFor } from '@/lib/sanity/sanity.image'

export default function PodcastRow({ podcast }) {
	// console.log(podcast)
	return (
		<div className="flex flex-col items-center gap-2 p-4 py-2 transition-all rounded-lg hover:bg-sky-950/50 md:flex-row md:gap-4">
			{podcast.image && (
				<Image
					className="h-auto w-96 md:w-24"
					width={200}
					height={200}
					alt={podcast.image?.alt || ''}
					src={urlFor(podcast.image).height(200).width(200).url()}
					sizes="100vw"
				/>
			)}
			<h3 className="p-4 text-lg font-medium">{podcast.title}</h3>
			{/* <PostAuthor name={author?.name} image={author?.image} /> */}
		</div>
	)
}
