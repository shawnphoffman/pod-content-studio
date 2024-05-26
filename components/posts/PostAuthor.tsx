import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'
import { POST_QUERYResult } from '@/lib/sanity/sanity.types'

type Props = {
	author: NonNullable<POST_QUERYResult>['author']
}

export default function PostAuthor(props: Props) {
	const { name, image } = props.author
	const src = urlForSanityImage(image!).height(96).width(96).fit('crop').url()
	return (
		<div className="flex items-center gap-2">
			<div className="relative w-12 h-12">
				<Image src={src} className="rounded-full border-2 border-red-600" height={96} width={96} alt={''} />
			</div>
			<div className="text-base font-bold lg:text-xl text-nowrap text-white">{name}</div>
		</div>
	)
}
