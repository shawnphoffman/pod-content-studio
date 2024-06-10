import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
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
			fields: [
				// {
				// 	name: 'alt',
				// 	type: 'string',
				// 	title: 'Alternative Text',
				// },
			],
			group: 'primary',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'webUrl',
			title: 'Website URL',
			type: 'url',
			// validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'webUrlDev',
			title: 'Website URL (Dev)',
			type: 'url',
			// validation: Rule => Rule.required(),
		}),
		//
		defineField({
			name: 'applePodcastId',
			title: 'Apple Podcast ID',
			type: 'string',
			group: 'metadata',
		}),
		defineField({
			name: 'spotifyPodcastId',
			title: 'Spotify Show ID',
			type: 'string',
			group: 'metadata',
		}),
	],
	orderings: [
		{
			title: 'Title',
			name: 'title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
