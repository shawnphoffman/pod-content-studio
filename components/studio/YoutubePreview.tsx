import YouTubePlayer from 'react-player/youtube'
import { Flex, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

export function YouTubePreview(props: PreviewProps) {
	const { title: url } = props

	return (
		<Flex padding={3} align="center" justify="center">
			{typeof url === 'string' ? <YouTubePlayer url={url} /> : <Text>Add a YouTube URL</Text>}
		</Flex>
	)
}
