/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 *
 * The Sanity CLI doesn't load .env.local (Next.js convention), so the
 * projectId is hardcoded here. It's a public identifier - safe to commit.
 * dataset can still come from env so the same studio code can target
 * different datasets in CI.
 */
import { defineCliConfig } from 'sanity/cli'

const projectId = 'uc06juhv'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({ api: { projectId, dataset } })
