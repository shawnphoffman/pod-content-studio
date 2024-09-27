import { faCassetteTape } from '@awesome.me/kit-50792a5d55/icons/classic/regular'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineField, defineType } from 'sanity'

// import { EmbedPreview } from '@/components/studio/EmbedPreview'

export const BANNER_LEVEL = [
	{ title: 'Info', value: 'info' },
	{ title: 'High Priority', value: 'priority' },
]

// https://www.sanity.io/guides/create-a-rich-string-selector-field-input

const bonusEpisode = defineType({
	name: 'bonusEpisode',
	type: 'document',
	title: 'Bonus Episode',
	description: 'xxx',
	icon: () => <FontAwesomeIcon icon={faCassetteTape} size="xs" />,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			description: 'This is not used for anything besides organization.',
			type: 'string',
			validation: rule => rule.required().max(50),
		}),
		defineField({
			name: 'episodeEmbed',
			type: 'embed',
			title: 'Episode Embed',
			description: 'xxx',
		}),
		defineField({
			name: 'publishedAt',
			title: 'Episode Date',
			description: 'This controls the order of posts in the feed.',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'categories',
			title: 'Podcasts',
			description: 'What podcasts is this relevant to? If one is not selected, the post will not be visible in the feeds.',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
		}),
	],
	preview: {
		select: { title: 'title', subtitle: 'episodeEmbed.url' },
	},
	// components: {
	// 	preview: EmbedPreview,
	// },
})

export default bonusEpisode
