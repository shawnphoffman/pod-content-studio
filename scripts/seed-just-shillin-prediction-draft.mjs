#!/usr/bin/env node
/**
 * Create a Just Shillin' DRAFT clone of the scruffy "Mandalorian and Grogu"
 * prediction post, with structured predictions[] populated from the original
 * post's portable-text body.
 *
 * The draft:
 *   - lives in the production dataset (visible in studio only - drafts are
 *     filtered out of the live site's `perspective: 'published'` queries)
 *   - has its categories rewritten to Just Shillin'
 *   - has a unique slug so it doesn't collide with the scruffy original
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=... node scripts/seed-just-shillin-prediction-draft.mjs
 */

import { randomUUID } from 'node:crypto'

import { createClient } from '@sanity/client'

const PROJECT_ID = 'uc06juhv'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const SOURCE_POST_ID = '98a9c2bd-c0be-4734-9f7b-57868d48d6d6' // scruffy Mandalorian post
const JUST_SHILLIN_POD_ID = '2e803c28-4870-46c7-90d3-70520ec90af8'
const NEW_SLUG = 'mandalorian-grogu-predictions-just-shillin-draft'
const TITLE_SUFFIX = ' (Just Shillin\' draft)'

if (!process.env.SANITY_AUTH_TOKEN) {
	console.error('ERROR: SANITY_AUTH_TOKEN env var required.')
	process.exit(1)
}

const client = createClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	apiVersion: API_VERSION,
	useCdn: false,
	token: process.env.SANITY_AUTH_TOKEN,
})

function blockText(block) {
	return (block.children ?? []).map(c => c.text ?? '').join('')
}

function parsePick(raw) {
	const m = raw.match(/^\s*(.+?)\s*[:\-]\s*(true|false)\b.*$/i)
	if (!m) return null
	return { name: m[1].trim(), pick: m[2].toUpperCase() }
}

function extractPredictions(body) {
	const predictions = []
	let inSection = false
	let current = null

	for (const block of body ?? []) {
		if (block._type !== 'block') continue
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
			if (!parsed) continue
			current.guesses.push({
				_key: randomUUID().slice(0, 12),
				_type: 'predictionGuess',
				pick: parsed.pick,
				guestName: parsed.name,
			})
		}
	}
	if (current) predictions.push(current)
	return predictions
}

async function main() {
	const src = await client.fetch(`*[_id == $id][0]`, { id: SOURCE_POST_ID })
	if (!src) {
		console.error(`Source post ${SOURCE_POST_ID} not found.`)
		process.exit(1)
	}

	const predictions = extractPredictions(src.body)
	if (!predictions.length) {
		console.error('No predictions parsed from source body.')
		process.exit(1)
	}

	const draftId = `drafts.${randomUUID()}`
	const draft = {
		_id: draftId,
		_type: 'post',
		title: src.title + TITLE_SUFFIX,
		slug: { _type: 'slug', current: NEW_SLUG },
		author: src.author, // reference, untouched
		mainImage: src.mainImage,
		excerpt: src.excerpt,
		body: src.body,
		publishedAt: src.publishedAt,
		commentsAtUrl: src.commentsAtUrl,
		categories: [{ _key: randomUUID().slice(0, 12), _type: 'reference', _ref: JUST_SHILLIN_POD_ID }],
		predictions,
	}

	const created = await client.create(draft)
	console.log(`Created draft: ${created._id}`)
	console.log(`Predictions: ${predictions.length}`)
	console.log(`Total guesses: ${predictions.reduce((n, p) => n + p.guesses.length, 0)}`)
	console.log(`Slug: ${NEW_SLUG}`)
	console.log(`Open in studio: <studio-base>/structure/post;${created._id.replace('drafts.', '')}`)
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
