import Image from 'next/image'

import { urlForSanityImage } from '@/lib/sanity/sanity.image'

const AuthorPreview = ({ document }) => {
	const author = document?.displayed
	const { name, image } = author

	const src = urlForSanityImage(image!).height(96).width(96).fit('crop').url()
	return (
		<div className="m-8">
			<div className="flex items-center gap-2">
				<div className="relative w-12 h-12">
					<Image src={src} className="rounded-full" height={96} width={96} alt={''} />
				</div>
				<div className="text-base font-bold lg:text-xl text-nowrap">{name}</div>
			</div>
		</div>
	)
}

export default AuthorPreview
