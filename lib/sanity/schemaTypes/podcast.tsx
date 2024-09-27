import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const podcast = defineType({
	name: 'category',
	title: 'Podcast',
	icon: ProjectsIcon,
	type: 'document',
	groups: [
		{
			name: 'primary',
			title: 'Primary',
			default: true,
		},
		{
			name: 'metadata',
			title: 'Metadata',
		},
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
			group: 'primary',
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			group: 'primary',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'categories',
			title: 'Authors',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'author' } }],
		}),
		defineField({
			name: 'webUrl',
			title: 'Website URL',
			type: 'url',
		}),
		defineField({
			name: 'webUrlDev',
			title: 'Website URL (Dev)',
			type: 'url',
		}),
		//
		defineField({
			name: 'applePodcastId',
			title: 'Apple Podcast ID',
			description: 'The xxx numbers in the URL like this: `https://podcasts.apple.com/us/podcast/idXXXXXXXXX`',
			type: 'number',
			group: 'metadata',
		}),
		defineField({
			name: 'spotifyPodcastId',
			title: 'Spotify Show ID',
			description: 'The xxx text in the URL like this: `https://open.spotify.com/show/XXXXXXXXX`',
			type: 'string',
			group: 'metadata',
		}),
		defineField({
			name: 'banner',
			title: 'Site Banner',
			type: 'banner',
			group: 'primary',
			// validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
			subtitle: 'webUrl',
		},
	},
	orderings: [
		{
			title: 'Title',
			name: 'title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})

export default podcast
