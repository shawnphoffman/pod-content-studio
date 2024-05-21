import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'
import { POST_QUERYResult } from '@/lib/sanity/sanity.types'

type Props = {
	image: NonNullable<POST_QUERYResult>['author']['image']
	name: NonNullable<POST_QUERYResult>['author']['name']
}

export default function PostAuthorAvatar(props: Props) {
	const { name, image } = props
	const src = urlForSanityImage(image!).height(96).width(96).fit('crop').url()
	return (
		<Image
			src={src}
			className="rounded-full border-2 border-red-600"
			height={48}
			width={48}
			alt={(image?.alt ?? name ?? '') as string}
			title={name}
		/>
	)
}
