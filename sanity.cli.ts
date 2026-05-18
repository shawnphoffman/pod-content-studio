/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 *
 * The Sanity CLI doesn't load .env.local (Next.js convention), so the
 * projectId is hardcoded here. It's a public identifier - safe to commit.
 * dataset can still come from env so the same studio code can target
 * different datasets in CI.
 *
 * The `vite` override mirrors the `@/*` path alias from tsconfig.json so
 * `sanity deploy` / `sanity build` can resolve imports the same way
 * Next.js does at runtime.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineCliConfig } from 'sanity/cli'

const projectId = 'uc06juhv'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineCliConfig({
	api: { projectId, dataset },
	deployment: {
		appId: 'wthotr5fa1nbpwynvvtohmd8',
	},
	vite: config => ({
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve?.alias,
				'@': __dirname,
			},
		},
	}),
})
