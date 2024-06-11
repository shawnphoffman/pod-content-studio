import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

const descLength = 100

export function EmbedPreview(props: PreviewProps) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const fetchController = useRef<AbortController | null>(null)
	const [meta, setMeta] = useState<any>(null)
	const { title: url } = props

	useEffect(() => {
		const fetchMeta = async () => {
			try {
				fetchController.current = new AbortController()
				const fetchUrl = `https://api.shawn.party/api/open-graph?scrape=${url}`
				// console.log('FETCHING')
				const response = await fetch(fetchUrl, { signal: fetchController.current.signal })
				if (response.status !== 200) {
					return
				}
				const data = await response.json()
				setMeta(data)
			} catch (error) {
				// only call dispatch when we know the fetch was not aborted
				if (!fetchController?.current?.signal?.aborted) {
					console.error('Error fetching meta', error)
				}
			}
		}
		if (!url) return
		try {
			const parsedUrl = new URL(url as string)
			if (parsedUrl) {
				timeoutRef.current = setTimeout(fetchMeta, 3000)
			}
		} catch {}

		return () => {
			if (timeoutRef.current) {
				// console.log('CLEARING TIMEOUT')
				clearTimeout(timeoutRef.current)
			}
			if (fetchController.current) {
				// console.log('ABORTING')
				fetchController.current.abort()
			}
		}
	}, [url])

	const image = useMemo(() => {
		return meta?.og?.image || meta?.images[0]?.src
	}, [meta])

	return (
		<Stack padding={3} space={[3, 10]}>
			{typeof url === 'string' ? (
				<>
					<Text accent weight="bold">
						{url}
					</Text>
					{meta ? (
						<Card border padding={3}>
							<Flex align={'center'}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img className="max-w-36 rounded-xl" src={image} alt="" />
								{/* <img className="max-w-36 rounded-xl" src={meta.images[0]?.src} alt="" /> */}
								<Stack space={3} padding={3}>
									<Text weight="semibold">{meta.meta.title}</Text>
									<Text size={1} muted>
										{meta.meta.description?.length > descLength
											? `${meta.meta.description.slice(0, descLength)}...`
											: meta.meta.description}
									</Text>
								</Stack>
								{/* {meta.images.map((image: any) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={image.src} alt="" key={image.src} />
						))} */}
							</Flex>
						</Card>
					) : (
						<div className="animate-pulse text-lg">Pending...</div>
					)}
				</>
			) : (
				<Text>Add a URL to Embed</Text>
			)}
		</Stack>
	)
}
