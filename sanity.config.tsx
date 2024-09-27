import { faPodcast } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
// import { media } from 'sanity-plugin-media'
import CustomStringInput from './components/studio/decorators/CharacterCount'
import ToolMenu from './components/studio/enhancements/ToolMenu'
// import { presentationTool, defineDocuments } from 'sanity/presentation'
// import { locate } from '@/sanity/presentation/locate'
import { apiVersion, dataset, projectId } from './lib/sanity/sanity.env'
import { getDefaultDocumentNode, podStructure } from './lib/sanity/sanity.structure'
import { schema } from './lib/sanity/schema'

// const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3001'

export default defineConfig({
	beta: {
		treeArrayEditing: {
			enabled: true,
		},
	},
	// REQUIRED
	projectId,
	dataset,

	// OPTIONAL FOR SINGLE WORKSPACE
	basePath: '/studio',
	title: `Shawn's Podcast Studio`,
	subtitle: 'Where good content is just out of reach',
	icon: () => <FontAwesomeIcon icon={faPodcast} size="xs" />,

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
		// media(),
		// dashboardTool({ widgets: [vercelWidget({ layout: { width: 'full' /* default and reccomended */ } })] }),
	],
})
