#!/usr/bin/env node
/**
 * Walk the existing predictions[] array on a post (or all posts) and upgrade
 * each guess.guestName to a predictor reference (-> author) when the name
 * matches an existing author document. Names with no match are left as
 * guestName.
 *
 * Use this when migration was already run with guestName fallbacks (e.g. the
 * seed-just-shillin-prediction-draft.mjs output) and you've since added the
 * matching author docs - or, in our case, predictors were repointed to author.
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=... node scripts/reresolve-predictors.mjs --slug=<slug>
 *   SANITY_AUTH_TOKEN=... node scripts/reresolve-predictors.mjs --id=<postId>
 *   SANITY_AUTH_TOKEN=... node scripts/reresolve-predictors.mjs              # all posts with predictions
 *
 * Defaults to dry-run; pass --apply to write.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'uc06juhv'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const idArg = args.find(a => a.startsWith('--id='))?.slice('--id='.length)
const slugArg = args.find(a => a.startsWith('--slug='))?.slice('--slug='.length)

if (!process.env.SANITY_AUTH_TOKEN) {
	console.error('ERROR: SANITY_AUTH_TOKEN env var required (drafts are token-gated).')
	process.exit(1)
}

const client = createClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	apiVersion: API_VERSION,
	useCdn: false,
	token: process.env.SANITY_AUTH_TOKEN,
})

async function loadAuthorMap() {
	const authors = await client.fetch(`*[_type == "author"]{ _id, name }`)
	return new Map(authors.filter(a => a.name).map(a => [a.name.trim().toLowerCase(), a._id]))
}

async function fetchPosts() {
	if (idArg) {
		const post = await client.fetch(`*[_id == $id][0]{ _id, title, "slug": slug.current, predictions }`, { id: idArg })
		return post ? [post] : []
	}
	if (slugArg) {
		const post = await client.fetch(
			`*[_type == "post" && slug.current == $slug] | order(_updatedAt desc)[0]{ _id, title, "slug": slug.current, predictions }`,
			{ slug: slugArg }
		)
		return post ? [post] : []
	}
	return await client.fetch(`*[_type == "post" && defined(predictions) && count(predictions) > 0]{ _id, title, "slug": slug.current, predictions }`)
}

function reresolve(predictions, authorIdByName) {
	let resolved = 0
	let unchanged = 0
	let alreadyRef = 0
	const next = predictions.map(p => ({
		...p,
		guesses: (p.guesses ?? []).map(g => {
			if (g.predictor?._ref) {
				alreadyRef += 1
				return g
			}
			const name = g.guestName?.trim().toLowerCase()
			if (!name) {
				unchanged += 1
				return g
			}
			const authorId = authorIdByName.get(name)
			if (!authorId) {
				unchanged += 1
				return g
			}
			resolved += 1
			const { guestName, ...rest } = g
			return { ...rest, predictor: { _type: 'reference', _ref: authorId } }
		}),
	}))
	return { next, resolved, unchanged, alreadyRef }
}

async function main() {
	const authorIdByName = await loadAuthorMap()
	console.error(`Loaded ${authorIdByName.size} authors.`)

	const posts = await fetchPosts()
	if (!posts.length) {
		console.error('No matching posts.')
		process.exit(1)
	}
	console.error(`Processing ${posts.length} post(s). Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`)

	for (const post of posts) {
		const { next, resolved, unchanged, alreadyRef } = reresolve(post.predictions ?? [], authorIdByName)
		console.log(`\n# ${post.title}`)
		console.log(`  _id: ${post._id}`)
		console.log(`  slug: ${post.slug}`)
		console.log(`  guesses resolved to author refs: ${resolved}`)
		console.log(`  guesses unchanged (no match / no name): ${unchanged}`)
		console.log(`  guesses already references: ${alreadyRef}`)
		if (resolved && apply) {
			await client.patch(post._id).set({ predictions: next }).commit()
			console.log(`  -> patched`)
		}
	}

	if (!apply) console.error('\nDry-run complete. Pass --apply to write.')
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
