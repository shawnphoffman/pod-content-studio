import { faShareNodes } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { EmbedPreview } from '@/components/studio/EmbedPreview'

const embed = defineType({
	name: 'embed',
	type: 'object',
	title: 'Embed',
	icon: () => <FontAwesomeIcon icon={faShareNodes} size="xs" />,
	fields: [
		defineField({
			name: 'url',
			type: 'url',
			title: 'URL to embed',
		}),
	],
	preview: {
		select: { title: 'url' },
	},
	components: {
		preview: EmbedPreview,
	},
})

export default embed
