import imageUrlBuilder from '@sanity/image-url'
import { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Flex, Stack } from '@sanity/ui'

import { client } from '@/lib/sanity/sanity.client'

// import { urlFor } from './image-url-builder'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
	return builder.image(source)
}

export default function GalleryPreview(props: { renderDefault?: any; images?: any; schemaType?: any }) {
	const { images, schemaType } = props
	const schemaTitle = schemaType.title

	const modifiedProps = {
		...props,
		title: schemaTitle,
	}

	return (
		<Stack space={[1]}>
			<>{props.renderDefault(modifiedProps)}</>
			<Flex
				style={{
					gap: '5px',
					overflowX: 'scroll',
				}}
			>
				{images?.map((image: any) => (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						key={image._ref}
						src={image.asset ? urlFor(image).url() : ''}
						style={{
							width: '400px',
							height: '200px',
							objectFit: 'cover',
						}}
						alt={image.alt}
					/>
				))}
			</Flex>
		</Stack>
	)
}
