import PostAuthor from '../posts/PostAuthor'

export default function AuthorRow({ author }) {
	return (
		<div className="flex flex-col items-center justify-between gap-2 p-4 py-2 transition-all rounded-lg hover:bg-sky-950/50 md:flex-row md:gap-4">
			<PostAuthor name={author?.name} image={author?.image} />
		</div>
	)
}
