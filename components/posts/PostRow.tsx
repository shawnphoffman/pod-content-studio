import Image from 'next/image'

import { urlFor } from '@/lib/sanity/sanity.image'

import PodcastAvatars from '../podcasts/PodcastAvatars'

import PostAuthor from './PostAuthor'
import PostAuthorAvatar from './PostAuthorAvatar'
import PostDate from './PostDate'

export default function PostRow({ mainImage, title, publishedAt, author, podcasts }) {
	return (
		<div className="flex flex-col items-center justify-between gap-2 p-4 py-2 transition-all rounded-lg hover:bg-sky-950/50 md:flex-row md:gap-4">
			{mainImage && (
				<Image
					className="h-auto w-96 md:w-24"
					width={400}
					height={200}
					alt={mainImage?.alt || ''}
					src={urlFor(mainImage).height(200).width(400).url()}
					sizes="100vw"
				/>
			)}
			<div className="flex flex-row flex-1 gap-2">
				<div className="flex items-center justify-center lg:hidden">
					<PostAuthorAvatar name={author?.name} image={author?.image} />
				</div>
				<div className="flex flex-col items-start justify-center flex-1 w-full">
					<span className="text-xl font-bold transition-colors group-hover:text-sky-400">{title}</span>
					<PostDate dateString={publishedAt} />
				</div>
			</div>
			{/* <PodcastAvatars podcasts={[...(podcasts || []), ...(podcasts || []), ...(podcasts || [])]} /> */}
			<PodcastAvatars podcasts={podcasts} />
			<div className="hidden lg:flex">
				<PostAuthor author={author} />
			</div>
		</div>
	)
}
