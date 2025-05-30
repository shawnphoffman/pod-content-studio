// ./sanity/lib/client.ts

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from './sanity.env'

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
	// These settings will be overridden in
	// ./sanity/lib/store.ts when draftMode is enabled
	perspective: 'published',
	stega: {
		enabled: false,
		studioUrl: '/studio',
	},
})
