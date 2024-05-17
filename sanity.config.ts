/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { RocketIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// import { presentationTool, defineDocuments } from 'sanity/presentation'
// import { locate } from '@/sanity/presentation/locate'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/sanity.env'
import { schema } from './sanity/schema'

// const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3001'

export default defineConfig({
	// REQUIRED
	projectId,
	dataset,

	// OPTIONAL FOR SINGLE WORKSPACE
	basePath: '/studio',
	title: `Shawn's Podcast Studio`,
	subtitle: 'Where good content is just out of reach',
	icon: RocketIcon,

	// MISC
	schema,
	plugins: [
		structureTool(),
		// Vision is a tool that lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		// presentationTool({
		// 	// locate,
		// 	resolve: {
		// 		mainDocuments: defineDocuments([
		// 			{
		// 				route: '/:slug',
		// 				filter: `_type == "post" && slug.current == $slug`,
		// 			},
		// 		]),
		// 	},
		// 	// previewUrl: SANITY_STUDIO_PREVIEW_URL,
		// 	previewUrl: {
		// 		draftMode: {
		// 			enable: '/api/draft',
		// 		},
		// 	},
		// }),
	],
})
