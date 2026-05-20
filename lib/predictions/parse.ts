// Parse a TSV/CSV pasted from Google Sheets into structured predictions.
// Pure - no Sanity dependencies so it stays testable.

export type ParsedGuess = {
	predictorName: string
	pick: 'TRUE' | 'FALSE'
}

export type ParsedPrediction = {
	title: string
	notes?: string
	actualOutcome?: 'TRUE' | 'FALSE'
	guesses: ParsedGuess[]
}

export type ParseResult = {
	predictions: ParsedPrediction[]
	warnings: string[]
	unmatchedCellValues: Array<{ predictorName: string; rawValue: string; predictionTitle: string }>
}

const TITLE_HEADERS = /^(question|prediction|title)$/i
const NOTES_HEADERS = /^notes?$/i
const ACTUAL_HEADERS = /^(actual|outcome|result)$/i

const TRUE_VALUES = new Set(['t', 'true', 'y', 'yes', '1'])
const FALSE_VALUES = new Set(['f', 'false', 'n', 'no', '0'])

function detectDelimiter(input: string): '\t' | ',' {
	const firstLine = input.split(/\r?\n/, 1)[0] ?? ''
	const tabs = (firstLine.match(/\t/g) ?? []).length
	const commas = (firstLine.match(/,/g) ?? []).length
	return tabs >= commas ? '\t' : ','
}

function splitLine(line: string, delim: '\t' | ','): string[] {
	// Tab-delimited paste from a spreadsheet doesn't quote fields. For CSV we
	// support simple quoted fields (no embedded delimiters of the other kind).
	if (delim === '\t') return line.split('\t')
	const out: string[] = []
	let cur = ''
	let inQuote = false
	for (let i = 0; i < line.length; i += 1) {
		const c = line[i]
		if (inQuote) {
			if (c === '"' && line[i + 1] === '"') {
				cur += '"'
				i += 1
			} else if (c === '"') {
				inQuote = false
			} else {
				cur += c
			}
		} else if (c === '"') {
			inQuote = true
		} else if (c === ',') {
			out.push(cur)
			cur = ''
		} else {
			cur += c
		}
	}
	out.push(cur)
	return out
}

function parsePickValue(raw: string): 'TRUE' | 'FALSE' | null {
	const v = raw.trim().toLowerCase()
	if (!v) return null
	if (TRUE_VALUES.has(v)) return 'TRUE'
	if (FALSE_VALUES.has(v)) return 'FALSE'
	return null
}

export function normalizeTitle(title: string): string {
	return title
		.trim()
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.replace(/[.!?,;:]+$/u, '')
}

export function parseTsv(input: string): ParseResult {
	const warnings: string[] = []
	const unmatchedCellValues: ParseResult['unmatchedCellValues'] = []
	const predictions: ParsedPrediction[] = []

	const trimmed = input.replace(/^﻿/, '').trim()
	if (!trimmed) {
		return { predictions, warnings: ['Nothing to parse.'], unmatchedCellValues }
	}

	const delim = detectDelimiter(trimmed)
	const lines = trimmed.split(/\r?\n/).filter(line => line.length > 0)
	if (lines.length < 2) {
		return {
			predictions,
			warnings: ['Need at least a header row and one data row.'],
			unmatchedCellValues,
		}
	}

	const headers = splitLine(lines[0]!, delim).map(h => h.trim())
	const titleIdx = headers.findIndex(h => TITLE_HEADERS.test(h))
	if (titleIdx === -1) {
		return {
			predictions,
			warnings: [`No title column found. Expected a header matching Question / Prediction / Title. Saw: ${headers.join(', ')}`],
			unmatchedCellValues,
		}
	}
	const notesIdx = headers.findIndex(h => NOTES_HEADERS.test(h))
	const actualIdx = headers.findIndex(h => ACTUAL_HEADERS.test(h))

	type PredictorCol = { index: number; name: string }
	const predictorCols: PredictorCol[] = headers
		.map((h, i) => {
			if (i === titleIdx || i === notesIdx || i === actualIdx) return null
			if (!h) return null
			return { index: i, name: h }
		})
		.filter((c): c is PredictorCol => c !== null)

	if (predictorCols.length === 0) {
		warnings.push('No predictor columns detected (all columns matched reserved headers).')
	}

	for (let lineNum = 1; lineNum < lines.length; lineNum += 1) {
		const cells = splitLine(lines[lineNum]!, delim).map(c => c.trim())
		const title = (cells[titleIdx] ?? '').trim()
		if (!title) continue

		const prediction: ParsedPrediction = { title, guesses: [] }

		const notes = notesIdx >= 0 ? (cells[notesIdx] ?? '').trim() : ''
		if (notes) prediction.notes = notes

		if (actualIdx >= 0) {
			const actualRaw = (cells[actualIdx] ?? '').trim()
			if (actualRaw) {
				const actual = parsePickValue(actualRaw)
				if (actual) prediction.actualOutcome = actual
				else warnings.push(`Row ${lineNum + 1} "${title}": unparseable Actual value "${actualRaw}" - left unresolved.`)
			}
		}

		for (const col of predictorCols) {
			const raw = (cells[col.index] ?? '').trim()
			if (!raw) continue
			const pick = parsePickValue(raw)
			if (!pick) {
				unmatchedCellValues.push({ predictorName: col.name, rawValue: raw, predictionTitle: title })
				continue
			}
			prediction.guesses.push({ predictorName: col.name, pick })
		}

		predictions.push(prediction)
	}

	return { predictions, warnings, unmatchedCellValues }
}

export function uniquePredictorNames(predictions: ParsedPrediction[]): string[] {
	const set = new Set<string>()
	for (const p of predictions) for (const g of p.guesses) set.add(g.predictorName)
	return Array.from(set).sort((a, b) => a.localeCompare(b))
}
