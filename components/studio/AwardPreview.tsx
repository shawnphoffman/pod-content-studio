const AwardPreview = ({ document }) => {
	const award = document?.displayed
	return (
		<div className="m-8">
			<a key={award._id} href={award.linkUrl} target="_blank" className={`flex flex-col items-center`} aria-label={award.name}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={award.imageUrl} alt="" width={award.width} height={award.height} />
			</a>
		</div>
	)
}

export default AwardPreview
