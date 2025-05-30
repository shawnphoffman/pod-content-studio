'use client'

import React, { useEffect, useRef, useState } from 'react'

type LazyYoutubeProps = {
	videoId: string
}

const LazyYoutube = ({ videoId }: LazyYoutubeProps) => {
	const [load, setLoad] = useState(false)
	const videoRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setLoad(true)
				observer.disconnect()
			}
		})

		// @ts-ignore
		observer.observe(videoRef.current)

		return () => {
			if (videoRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(videoRef.current)
			}
		}
	}, [])

	return (
		<div ref={videoRef} className="my-6 mx-4">
			{load ? (
				<iframe
					width="100%"
					height="400"
					src={`https://www.youtube.com/embed/${videoId}`}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}

export default LazyYoutube
