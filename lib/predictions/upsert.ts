// Merge parsed TSV predictions into an existing predictions[] field value.
// Pure - all Sanity-doc shapes are typed locally so this is unit-testable.

import { normalizeTitle, type ParsedGuess, type ParsedPrediction } from './parse'

type SanityGuess = {
	_key: string
	_type: 'predictionGuess'
	pick: 'TRUE' | 'FALSE'
	guestName?: string
	predictor?: { _type: 'reference'; _ref: string }
}

type SanityPrediction = {
	_key: string
	_type: 'prediction'
	title: string
	actualOutcome?: 'TRUE' | 'FALSE'
	notes?: string
	guesses?: SanityGuess[]
}

export type UpsertSummary = {
	created: number
	updated: number
	guessesAdded: number
	guessesUpdated: number
	guessesAsRef: number
	guessesAsGuest: number
}

type RandKey = () => string

export function upsertPredictions(
	existing: SanityPrediction[] | undefined | null,
	parsed: ParsedPrediction[],
	authorIdByName: Map<string, string>,
	randKey: RandKey = () => Math.random().toString(36).slice(2, 14),
): { next: SanityPrediction[]; summary: UpsertSummary } {
	const next: SanityPrediction[] = (existing ?? []).map(p => ({
		...p,
		guesses: p.guesses ? p.guesses.map(g => ({ ...g })) : [],
	}))

	const byTitle = new Map<string, SanityPrediction>()
	for (const p of next) byTitle.set(normalizeTitle(p.title), p)

	const summary: UpsertSummary = {
		created: 0,
		updated: 0,
		guessesAdded: 0,
		guessesUpdated: 0,
		guessesAsRef: 0,
		guessesAsGuest: 0,
	}

	for (const incoming of parsed) {
		const key = normalizeTitle(incoming.title)
		const match = byTitle.get(key)

		if (!match) {
			const newPrediction: SanityPrediction = {
				_key: randKey(),
				_type: 'prediction',
				title: incoming.title,
				guesses: [],
			}
			if (incoming.notes) newPrediction.notes = incoming.notes
			if (incoming.actualOutcome) newPrediction.actualOutcome = incoming.actualOutcome
			for (const g of incoming.guesses) {
				newPrediction.guesses!.push(buildGuess(g, authorIdByName, randKey, summary))
				summary.guessesAdded += 1
			}
			next.push(newPrediction)
			byTitle.set(key, newPrediction)
			summary.created += 1
			continue
		}

		// Upsert: blank fields in the import leave existing alone.
		if (incoming.notes) match.notes = incoming.notes
		if (incoming.actualOutcome) match.actualOutcome = incoming.actualOutcome

		match.guesses = match.guesses ?? []
		for (const g of incoming.guesses) {
			const existingGuess = match.guesses.find(eg => guessMatchesPredictor(eg, g.predictorName, authorIdByName))
			if (existingGuess) {
				if (existingGuess.pick !== g.pick) {
					existingGuess.pick = g.pick
					summary.guessesUpdated += 1
				}
			} else {
				match.guesses.push(buildGuess(g, authorIdByName, randKey, summary))
				summary.guessesAdded += 1
			}
		}
		summary.updated += 1
	}

	return { next, summary }
}

function buildGuess(
	parsed: ParsedGuess,
	authorIdByName: Map<string, string>,
	randKey: RandKey,
	summary: UpsertSummary,
): SanityGuess {
	const authorId = authorIdByName.get(parsed.predictorName.trim().toLowerCase())
	if (authorId) {
		summary.guessesAsRef += 1
		return {
			_key: randKey(),
			_type: 'predictionGuess',
			pick: parsed.pick,
			predictor: { _type: 'reference', _ref: authorId },
		}
	}
	summary.guessesAsGuest += 1
	return {
		_key: randKey(),
		_type: 'predictionGuess',
		pick: parsed.pick,
		guestName: parsed.predictorName,
	}
}

function guessMatchesPredictor(existing: SanityGuess, predictorName: string, authorIdByName: Map<string, string>): boolean {
	const normalized = predictorName.trim().toLowerCase()
	const expectedAuthorId = authorIdByName.get(normalized)
	if (expectedAuthorId && existing.predictor?._ref === expectedAuthorId) return true
	if (!expectedAuthorId && existing.guestName?.trim().toLowerCase() === normalized) return true
	// Also match when existing was added as guestName but the new import would
	// resolve to a ref - treat as the same predictor identity.
	if (!existing.predictor && existing.guestName?.trim().toLowerCase() === normalized) return true
	return false
}

export type { SanityGuess, SanityPrediction }
