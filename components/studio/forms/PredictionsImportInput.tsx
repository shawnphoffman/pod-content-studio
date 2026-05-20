import { useCallback, useEffect, useMemo, useState } from 'react'
import { Badge, Box, Button, Card, Flex, Heading, Inline, Stack, Text, TextArea } from '@sanity/ui'
import { type ArrayOfObjectsInputProps, set, useClient } from 'sanity'

import { parseTsv, uniquePredictorNames, type ParseResult } from '@/lib/predictions/parse'
import { upsertPredictions, type SanityPrediction, type UpsertSummary } from '@/lib/predictions/upsert'

type AuthorRow = { _id: string; name: string }

// Custom input for the post.predictions array. Renders a paste-TSV panel above
// the default array editor; pastes from Google Sheets become structured
// prediction objects in one click. Existing predictions are upserted by
// normalized title so post-show "actual outcome" updates don't blow away
// pre-show guess data.
export function PredictionsImportInput(props: ArrayOfObjectsInputProps) {
	const { value, onChange, renderDefault } = props
	const client = useClient({ apiVersion: '2024-01-01' })

	const [authors, setAuthors] = useState<AuthorRow[]>([])
	const [authorsError, setAuthorsError] = useState<string | null>(null)
	const [raw, setRaw] = useState('')
	const [parsed, setParsed] = useState<ParseResult | null>(null)
	const [lastSummary, setLastSummary] = useState<UpsertSummary | null>(null)
	const [applying, setApplying] = useState(false)

	useEffect(() => {
		let cancelled = false
		client
			.fetch<AuthorRow[]>(`*[_type == "author"]{ _id, name }`)
			.then(rows => {
				if (!cancelled) setAuthors(rows ?? [])
			})
			.catch(err => {
				if (!cancelled) setAuthorsError(err?.message ?? 'Failed to load authors')
			})
		return () => {
			cancelled = true
		}
	}, [client])

	const authorIdByName = useMemo(() => {
		const m = new Map<string, string>()
		for (const a of authors) if (a.name) m.set(a.name.trim().toLowerCase(), a._id)
		return m
	}, [authors])

	const handlePreview = useCallback(() => {
		setParsed(parseTsv(raw))
		setLastSummary(null)
	}, [raw])

	const unmatchedNames = useMemo(() => {
		if (!parsed) return []
		const names = uniquePredictorNames(parsed.predictions)
		return names.filter(n => !authorIdByName.has(n.trim().toLowerCase()))
	}, [parsed, authorIdByName])

	const handleApply = useCallback(() => {
		if (!parsed || parsed.predictions.length === 0) return
		setApplying(true)
		try {
			const existing = (value as SanityPrediction[] | undefined) ?? []
			const { next, summary } = upsertPredictions(existing, parsed.predictions, authorIdByName)
			onChange(set(next))
			setLastSummary(summary)
			setRaw('')
			setParsed(null)
		} finally {
			setApplying(false)
		}
	}, [parsed, value, authorIdByName, onChange])

	const handleClear = useCallback(() => {
		setRaw('')
		setParsed(null)
		setLastSummary(null)
	}, [])

	return (
		<Stack space={4}>
			<Card padding={3} radius={2} shadow={1} tone="primary">
				<Stack space={3}>
					<Heading size={1}>Import from Google Sheets</Heading>
					<Text size={1} muted>
						Paste a TSV (or CSV). First row is headers. Use column names "Question" / "Prediction" / "Title" for the question, one
						column per predictor (header = their name), optionally "Notes" and "Actual" columns.
					</Text>
					{authorsError ? (
						<Text size={1} style={{ color: 'tomato' }}>
							Could not load authors: {authorsError}. Names will fall back to guestName.
						</Text>
					) : null}
					<TextArea
						rows={8}
						value={raw}
						onChange={e => setRaw(e.currentTarget.value)}
						placeholder={'Question\tChris\tKev\tJimmy\tShawn\tEd\tNotes\nGrogu species revealed\tF\tF\tF\tT\tT\tSample note'}
						style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 12 }}
					/>
					<Flex gap={2} align="center">
						<Button text="Parse preview" tone="primary" onClick={handlePreview} disabled={!raw.trim()} />
						<Button
							text={applying ? 'Applying...' : 'Apply (upsert)'}
							tone="positive"
							onClick={handleApply}
							disabled={!parsed || parsed.predictions.length === 0 || applying}
						/>
						<Button text="Clear" mode="ghost" onClick={handleClear} disabled={!raw && !parsed} />
						<Box flex={1} />
						<Text size={0} muted>
							{authors.length} authors loaded
						</Text>
					</Flex>

					{parsed ? (
						<Stack space={2}>
							<Card padding={3} radius={2} tone="default" shadow={1}>
								<Stack space={2}>
									<Inline space={2}>
										<Badge tone="primary">{parsed.predictions.length} predictions</Badge>
										<Badge tone="primary">
											{parsed.predictions.reduce((n, p) => n + p.guesses.length, 0)} guesses
										</Badge>
										{parsed.predictions.filter(p => p.actualOutcome).length > 0 ? (
											<Badge tone="positive">
												{parsed.predictions.filter(p => p.actualOutcome).length} with Actual
											</Badge>
										) : null}
										{unmatchedNames.length > 0 ? (
											<Badge tone="caution">{unmatchedNames.length} unmatched predictor(s)</Badge>
										) : (
											<Badge tone="positive">All predictors matched</Badge>
										)}
									</Inline>

									{unmatchedNames.length > 0 ? (
										<Text size={1} muted>
											Unmatched (will use guestName): {unmatchedNames.join(', ')}
										</Text>
									) : null}

									{parsed.warnings.length > 0 ? (
										<Stack space={1}>
											{parsed.warnings.map((w, i) => (
												<Text key={i} size={1} style={{ color: 'tomato' }}>
													{w}
												</Text>
											))}
										</Stack>
									) : null}

									{parsed.unmatchedCellValues.length > 0 ? (
										<Stack space={1}>
											<Text size={1} weight="semibold">
												Cell values that couldn't be parsed as TRUE/FALSE (skipped):
											</Text>
											{parsed.unmatchedCellValues.slice(0, 5).map((u, i) => (
												<Text key={i} size={1} muted>
													- {u.predictorName} on "{u.predictionTitle}": "{u.rawValue}"
												</Text>
											))}
											{parsed.unmatchedCellValues.length > 5 ? (
												<Text size={1} muted>
													...and {parsed.unmatchedCellValues.length - 5} more
												</Text>
											) : null}
										</Stack>
									) : null}
								</Stack>
							</Card>
						</Stack>
					) : null}

					{lastSummary ? (
						<Card padding={3} radius={2} tone="positive" shadow={1}>
							<Inline space={2}>
								<Badge tone="positive">Applied</Badge>
								<Text size={1}>
									{lastSummary.created} new, {lastSummary.updated} updated. Guesses: +{lastSummary.guessesAdded} added,{' '}
									{lastSummary.guessesUpdated} updated. (refs: {lastSummary.guessesAsRef}, guests: {lastSummary.guessesAsGuest})
								</Text>
							</Inline>
						</Card>
					) : null}
				</Stack>
			</Card>

			{renderDefault(props)}
		</Stack>
	)
}

export default PredictionsImportInput
