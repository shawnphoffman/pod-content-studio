'use client'

import { useState } from 'react'
import { faLeft } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

function extractInfoFromHtml(html: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const imgElement = doc.querySelector('img')
	const linkElement = doc.querySelector('a[href*="leaderboard"]')
	const textElement = doc.querySelector('a[href*="leaderboard"]:nth-of-type(2)')

	const imageUrl = imgElement?.getAttribute('src') || ''
	const imageHeight = imgElement?.getAttribute('height') || imgElement?.style.height.replace('px', '') || ''
	const imageWidth = imgElement?.getAttribute('width') || imgElement?.style.width.replace('px', '') || ''
	const linkUrl = linkElement?.getAttribute('href') || ''
	const awardText = textElement?.textContent?.trim() || ''

	return {
		imageUrl,
		imageHeight,
		imageWidth,
		linkUrl,
		awardText,
	}
}

export default function Page() {
	const [raw, setRaw] = useState('')

	const [extractedInfo, setExtractedInfo] = useState({
		imageUrl: '',
		imageHeight: '',
		imageWidth: '',
		linkUrl: '',
		awardText: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setRaw(e.target.value.trim())
		setExtractedInfo(extractInfoFromHtml(e.target.value))
	}

	return (
		<div>
			<h1>Award Extraction:</h1>
			<Link href="/award" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faLeft} />
				<span>Back to Awards</span>
			</Link>
			<div className="p-4 flex flex-col gap-2">
				<h2>Raw Goodpods Badge</h2>
				<textarea
					value={raw}
					onChange={handleChange}
					name="raw"
					id="raw"
					rows={5}
					className="block w-full rounded-md shadow-sm dark:bg-zinc-900 text-zinc-300"
					placeholder="Paste raw Goodpods badge here..."
				></textarea>
			</div>
			<div className="p-4 flex flex-col gap-2">
				<h2>Extracted Info:</h2>
				<div className="flex flex-col gap-4">
					{/*  */}
					<label htmlFor="awardText">
						<span className="font-bold">Award Text:</span>
						<div className="flex flex-row gap-2 justify-center items-center">
							<input
								type="text"
								id="awardText"
								value={extractedInfo.awardText}
								className="block w-full rounded-md shadow-sm dark:bg-zinc-900"
								readOnly
								onFocus={event => event.target.select()}
							/>
							<button
								onClick={() => navigator.clipboard.writeText(extractedInfo.awardText)}
								className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700"
							>
								Copy
							</button>
						</div>
					</label>
					{/*  */}
					<label htmlFor="linkUrl">
						<span className="font-bold">Link URL:</span>
						<div className="flex flex-row gap-2 justify-center items-center">
							<textarea
								id="linkUrl"
								value={extractedInfo.linkUrl}
								className="block w-full rounded-md shadow-sm dark:bg-zinc-900"
								readOnly
								onFocus={event => event.target.select()}
							/>
							<button
								onClick={() => navigator.clipboard.writeText(extractedInfo.linkUrl)}
								className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700"
							>
								Copy
							</button>
						</div>
					</label>
					{/*  */}
					<label htmlFor="imageUrl">
						<span className="font-bold">Image Height:</span>
						<div className="flex flex-row gap-2 justify-center items-center">
							<textarea
								id="imageUrl"
								value={extractedInfo.imageUrl}
								className="block w-full rounded-md shadow-sm dark:bg-zinc-900"
								readOnly
								onFocus={event => event.target.select()}
							/>
							<button
								onClick={() => navigator.clipboard.writeText(extractedInfo.imageUrl)}
								className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700"
							>
								Copy
							</button>
						</div>
					</label>
					<div className="flex flex-row gap-4 w-full">
						{/*  */}
						<label htmlFor="imageHeight">
							<span className="font-bold">Image Height:</span>
							<div className="flex flex-row gap-2 justify-center items-center">
								<input
									type="text"
									id="imageHeight"
									value={extractedInfo.imageHeight}
									className="rounded-md shadow-sm dark:bg-zinc-900"
									readOnly
									onFocus={event => event.target.select()}
								/>
								<button
									onClick={() => navigator.clipboard.writeText(extractedInfo.imageHeight)}
									className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700"
								>
									Copy
								</button>
							</div>
						</label>
						{/*  */}
						<label htmlFor="imageWidth">
							<span className="font-bold">Image Width:</span>
							<div className="flex flex-row gap-2 justify-center items-center">
								<input
									type="text"
									id="imageWidth"
									value={extractedInfo.imageWidth}
									className=" rounded-md shadow-sm dark:bg-zinc-900"
									readOnly
									onFocus={event => event.target.select()}
								/>
								<button
									onClick={() => navigator.clipboard.writeText(extractedInfo.imageWidth)}
									className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700"
								>
									Copy
								</button>
							</div>
						</label>
					</div>
				</div>
			</div>
		</div>
	)
}
