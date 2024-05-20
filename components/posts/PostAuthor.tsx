import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'
import { Author } from '@/lib/sanity/sanity.types'

type Props = {
	image: Author['image']
	name: Author['name']
}

export default function PostAuthor(props: Props) {
	const { name, image } = props
	const src = urlForSanityImage(image!).height(96).width(96).fit('crop').url()
	return (
		<div className="flex items-center gap-2">
			<div className="relative w-12 h-12">
				<Image src={src} className="rounded-full" height={96} width={96} alt={(image?.alt ?? name ?? '') as string} />
			</div>
			<div className="text-base font-bold lg:text-xl text-nowrap">{name}</div>
		</div>
	)
}
