import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'
import { Author } from '@/lib/sanity/sanity.types'

export default function PostAuthorAvatar(props: Author) {
	const { name, image } = props
	const src = urlForSanityImage(image).height(48).width(48).fit('crop').url()
	return <Image src={src} className="rounded-full" height={48} width={48} alt={image?.alt ?? name} title={name} />
}
