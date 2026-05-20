#!/usr/bin/env node
/**
 * Migrate "True/False Predictions" posts from portable-text bodies into the
 * structured `predictions[]` field on the post.
 *
 * Defaults to dry-run. Pass --apply to write to the dataset.
 *
 * Usage:
 *   node scripts/migrate-predictions.mjs                       # dry-run, all candidate posts
 *   node scripts/migrate-predictions.mjs --id=<postId>         # dry-run, single post (id may be drafts.xxx)
 *   node scripts/migrate-predictions.mjs --slug=<slug>         # dry-run, single post by slug (prefers latest)
 *   SANITY_AUTH_TOKEN=... node scripts/migrate-predictions.mjs --apply
 *
 * Parsing rules (derived from the scruffy "Mandalorian and Grogu" post):
 *   - Predictions live between an h2 titled "The Predictions" and the next h2 (or end).
 *   - Each h3 inside that range starts a new prediction; the h3 text is the title.
 *   - Each bullet list item that follows is one guess in the form "Name: True" / "Name: False".
 *   - Unknown formats are skipped and logged.
 *
 * Predictors are author documents. The script fetches all authors at start
 * and resolves each parsed name (case-insensitive) to an author reference.
 * Names with no matching author go to `guestName` for a human to promote.
 *
 * Per the master plan: this script NEVER auto-creates author documents.
 */

import { randomUUID } from 'node:crypto'

import { createClient } from '@sanity/client'

const PROJECT_ID = 'uc06juhv'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const idArg = args.find(a => a.startsWith('--id='))?.slice('--id='.length)
const slugArg = args.find(a => a.startsWith('--slug='))?.slice('--slug='.length)

const client = createClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	apiVersion: API_VERSION,
	useCdn: false,
	token: process.env.SANITY_AUTH_TOKEN,
})

/** Populated at runtime from Sanity author docs: lowercased name -> author _id. */
let authorIdByName = new Map()

async function loadAuthorMap() {
	const authors = await client.fetch(`*[_type == "author"]{ _id, name }`)
	authorIdByName = new Map(authors.filter(a => a.name).map(a => [a.name.trim().toLowerCase(), a._id]))
	console.error(`Loaded ${authorIdByName.size} authors for reference resolution.`)
}

const CANDIDATE_QUERY = `*[_type == "post" && (
	title match "*Predictions*" ||
	title match "*True and False*" ||
	title match "*True or False*"
) && !defined(predictions)]{ _id, title, "slug": slug.current, body }`

const SINGLE_POST_QUERY = `*[_id == $id][0]{ _id, title, "slug": slug.current, body }`

// Match by slug. Prefers drafts when both exist (drafts have higher _updatedAt).
const SLUG_QUERY = `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc)[0]{ _id, title, "slug": slug.current, body }`

function blockText(block) {
	return (block.children ?? []).map(c => c.text ?? '').join('')
}

function parsePick(raw) {
	// Match "Name: True" or "Name - False" with optional trailing commentary
	// (e.g. "Kev: False (less, 54/55%)"). Commentary is discarded.
	const m = raw.match(/^\s*(.+?)\s*[:\-]\s*(true|false)\b.*$/i)
	if (!m) return null
	return { name: m[1].trim(), pick: m[2].toUpperCase() }
}

function extractPredictions(body) {
	const predictions = []
	let inSection = false
	let current = null
	const skipped = []

	for (const block of body ?? []) {
		if (block._type !== 'block') {
			if (inSection && current) {
				// non-block content (image/embed) inside a prediction; skip silently
			}
			continue
		}
		const text = blockText(block).trim()
		const { style, listItem } = block

		if (style === 'h2' && /^the predictions$/i.test(text)) {
			inSection = true
			continue
		}
		if (!inSection) continue
		if (style === 'h2') {
			if (current) predictions.push(current)
			current = null
			inSection = false
			continue
		}
		if (style === 'h3') {
			if (current) predictions.push(current)
			current = { _key: randomUUID().slice(0, 12), _type: 'prediction', title: text, guesses: [] }
			continue
		}
		if (listItem === 'bullet' && current) {
			const parsed = parsePick(text)
			if (!parsed) {
				skipped.push({ predictionTitle: current.title, rawText: text })
				continue
			}
			const guess = {
				_key: randomUUID().slice(0, 12),
				_type: 'predictionGuess',
				pick: parsed.pick,
			}
			const authorId = authorIdByName.get(parsed.name.trim().toLowerCase())
			if (authorId) {
				guess.predictor = { _type: 'reference', _ref: authorId }
			} else {
				guess.guestName = parsed.name
			}
			current.guesses.push(guess)
		}
	}
	if (current) predictions.push(current)

	return { predictions, skipped }
}

function summarize(post, parsed) {
	const { predictions, skipped } = parsed
	const totalGuesses = predictions.reduce((n, p) => n + p.guesses.length, 0)
	const refCount = predictions.reduce((n, p) => n + p.guesses.filter(g => g.predictor).length, 0)
	const guestCount = totalGuesses - refCount
	const lines = []
	lines.push(`# ${post.title}`)
	lines.push(`  _id: ${post._id}`)
	lines.push(`  slug: ${post.slug}`)
	lines.push(`  predictions: ${predictions.length}`)
	lines.push(`  total guesses: ${totalGuesses} (${refCount} author refs, ${guestCount} guestName)`)
	if (skipped.length) {
		lines.push(`  skipped lines: ${skipped.length}`)
		for (const s of skipped.slice(0, 5)) {
			lines.push(`    - under "${s.predictionTitle}": "${s.rawText}"`)
		}
		if (skipped.length > 5) lines.push(`    ... and ${skipped.length - 5} more`)
	}
	lines.push('')
	lines.push('  first prediction preview:')
	const first = predictions[0]
	if (first) {
		lines.push(`    title: ${first.title}`)
		for (const g of first.guesses) {
			const who = g.predictor ? `<ref:${g.predictor._ref}>` : g.guestName
			lines.push(`    - ${who}: ${g.pick}`)
		}
	}
	return lines.join('\n')
}

async function main() {
	await loadAuthorMap()

	let posts
	if (idArg) {
		posts = [await client.fetch(SINGLE_POST_QUERY, { id: idArg })].filter(Boolean)
	} else if (slugArg) {
		posts = [await client.fetch(SLUG_QUERY, { slug: slugArg })].filter(Boolean)
	} else {
		posts = await client.fetch(CANDIDATE_QUERY)
	}

	if (!posts.length) {
		console.error('No candidate posts found.')
		process.exit(1)
	}

	console.error(`Found ${posts.length} candidate post(s). Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`)
	if (apply && !process.env.SANITY_AUTH_TOKEN) {
		console.error('ERROR: --apply requires SANITY_AUTH_TOKEN env var.')
		process.exit(1)
	}

	let written = 0
	for (const post of posts) {
		const parsed = extractPredictions(post.body)
		console.log('\n' + summarize(post, parsed))

		if (!parsed.predictions.length) {
			console.log('  (no predictions parsed - skipping)')
			continue
		}

		if (apply) {
			await client.patch(post._id).set({ predictions: parsed.predictions }).commit()
			console.log(`  -> wrote predictions[] (${parsed.predictions.length})`)
			written += 1
		}
	}

	if (apply) console.error(`\nDone. Updated ${written} post(s).`)
	else console.error(`\nDry-run complete. Pass --apply to write.`)
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
