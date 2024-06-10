/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { RocketIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import CustomStringInput from './components/studio/decorators/CharacterCount'
import ToolMenu from './components/studio/enhancements/ToolMenu'
// import { presentationTool, defineDocuments } from 'sanity/presentation'
// import { locate } from '@/sanity/presentation/locate'
import { apiVersion, dataset, projectId } from './lib/sanity/sanity.env'
import { getDefaultDocumentNode, podStructure } from './lib/sanity/sanity.structure'
import { schema } from './lib/sanity/schema'

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
	studio: {
		components: {
			toolMenu: ToolMenu,
		},
	},
	form: {
		components: {
			input: props => (props.schemaType?.name === 'string' ? <CustomStringInput {...props} /> : props.renderDefault(props)),
		},
	},
	plugins: [
		//
		structureTool({
			structure: podStructure,
			defaultDocumentNode: getDefaultDocumentNode,
		}),
		//
		visionTool({ defaultApiVersion: apiVersion }),
		//
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
