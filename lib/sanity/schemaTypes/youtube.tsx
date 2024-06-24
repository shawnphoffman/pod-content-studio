import { faYoutube } from '@awesome.me/kit-50792a5d55/icons/classic/brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineField, defineType } from 'sanity'

import { YouTubePreview } from '@/components/studio/YoutubePreview'

const youtube = defineType({
	name: 'youtube',
	type: 'object',
	title: 'YouTube',
	icon: <FontAwesomeIcon icon={faYoutube} size="xs" />,
	fields: [
		defineField({
			name: 'url',
			type: 'url',
			title: 'YouTube Video URL',
			description: 'Paste a YouTube video URL here. Example: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID',
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
