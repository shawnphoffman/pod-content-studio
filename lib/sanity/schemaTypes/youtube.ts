import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { YouTubePreview } from '@/components/studio/YoutubePreview'

const youtube = defineType({
	name: 'youtube',
	type: 'object',
	title: 'YouTube',
	icon: PlayIcon,
	fields: [
		defineField({
			name: 'url',
			type: 'url',
			title: 'YouTube video URL',
		}),
	],
	preview: {
		select: { title: 'url' },
	},
	components: {
		preview: YouTubePreview,
	},
})

export default youtube
