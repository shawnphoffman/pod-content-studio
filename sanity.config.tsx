import { faPodcast } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { defineDocuments, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

// import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
// import { media } from 'sanity-plugin-media'
import CustomStringInput from './components/studio/decorators/CharacterCount'
import ToolMenu from './components/studio/enhancements/ToolMenu'
import { locate } from './lib/sanity/presentation/locate'
import { apiVersion, dataset, projectId } from './lib/sanity/sanity.env'
import { adminStructure, buildPodStructure, getDefaultDocumentNode } from './lib/sanity/sanity.structure'
import { schema } from './lib/sanity/schema'

// One workspace per podcast site, all sharing the same project + dataset.
// Each workspace's desk is filtered to its podcast's content and its
// Presentation tool previews the matching site. Hosts pick their podcast
// at /studio and stay scoped to it.
//
// To add a new podcast: copy a row, fill in the category._id from Sanity,
// and point previewOrigin at the new site.
type PodcastWorkspace = {
	name: string
	title: string
	podId: string
	previewOrigin: string
}

const PODCAST_WORKSPACES: PodcastWorkspace[] = [
	{
		name: 'scruffy',
		title: `Scruffy Lookin' Podcasters`,
		podId: '79aa2892-e3ca-4ef0-869f-ef36846b241b',
		previewOrigin: 'https://scruffypod.com',
	},
	{
		name: 'jammed',
		title: 'Jammed Transmissions',
		podId: '7c28ad82-6f13-437e-8af5-c8285ac2269f',
		previewOrigin: 'https://jammedtransmissions.com',
	},
	{
		name: 'justshillin',
		title: 'Just Shillin',
		podId: '2e803c28-4870-46c7-90d3-70520ec90af8',
		previewOrigin: 'https://justshillin.com',
	},
	{
		name: 'blueharvest',
		title: 'Blue Harvest',
		podId: '6c03379a-0584-4e22-9fd2-12525f75e6af',
		previewOrigin: 'https://blueharvest.rocks',
	},
	{
		name: 'bluey',
		title: 'Dinner with the Heelers',
		podId: '386d4bf9-2128-40ae-bdae-22e23696f5bb',
		previewOrigin: 'https://blueypodcast.com',
	},
	{
		name: 'mwf',
		title: 'My Weird Foot',
		podId: '33a22e16-f2c4-437d-b5db-47ad708d6442',
		previewOrigin: 'https://myweirdfoot.com',
	},
]

// Shared studio/form chrome - identical across every workspace.
const sharedStudioConfig = {
	projectId,
	dataset,
	schema,
	studio: {
		components: {
			toolMenu: ToolMenu,
		},
	},
	form: {
		components: {
			input: (props: any) =>
				props.schemaType?.name === 'string' ? <CustomStringInput {...props} /> : props.renderDefault(props),
		},
	},
}

const podcastWorkspaceConfigs = PODCAST_WORKSPACES.map(pod => ({
	...sharedStudioConfig,
	name: pod.name,
	title: pod.title,
	basePath: `/studio/${pod.name}`,
	icon: () => <FontAwesomeIcon icon={faPodcast} size="xs" />,
	plugins: [
		structureTool({
			structure: buildPodStructure(pod.podId),
			defaultDocumentNode: getDefaultDocumentNode,
		}),
		visionTool({ defaultApiVersion: apiVersion }),
		presentationTool({
			locate,
			resolve: {
				mainDocuments: defineDocuments([
					{
						route: '/updates/:slug',
						filter: `_type == "post" && slug.current == $slug`,
					},
				]),
			},
			previewUrl: {
				origin: pod.previewOrigin,
				draftMode: {
					enable: '/api/draft/enable',
				},
			},
		}),
	],
}))

// "All Podcasts" admin workspace - keeps the original cross-podcast desk
// for managing shared content (authors, raw doc lists, anything that
// spans podcasts). No Presentation tool here since there's no single
// site to preview against.
const adminWorkspaceConfig = {
	...sharedStudioConfig,
	name: 'admin',
	title: 'All Podcasts',
	basePath: '/studio/admin',
	icon: () => <FontAwesomeIcon icon={faPodcast} size="xs" />,
	plugins: [
		structureTool({
			structure: adminStructure,
			defaultDocumentNode: getDefaultDocumentNode,
		}),
		visionTool({ defaultApiVersion: apiVersion }),
		// media(),
		// dashboardTool({ widgets: [vercelWidget({ layout: { width: 'full' } })] }),
	],
}

export default defineConfig([adminWorkspaceConfig, ...podcastWorkspaceConfigs])
