import { POST_QUERYResult } from '@/lib/sanity/sanity.types'

import PostAuthor from '../posts/PostAuthor'

type Props = {
	author: NonNullable<POST_QUERYResult>['author']
}

export default function AuthorRow({ author }: Props) {
	return (
		<div className="flex flex-col items-center justify-between gap-2 p-4 py-2 transition-all rounded-lg hover:bg-sky-950/50 md:flex-row md:gap-4">
			<PostAuthor author={author} />
		</div>
	)
}
