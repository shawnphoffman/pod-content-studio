import { SanityDocument } from 'next-sanity'

import Authors from '@/components/Authors'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AUTHORS_QUERY } from '@/lib/sanity/sanity.queries'

export default async function Page() {
	const authors = await sanityFetch<SanityDocument[]>({
		query: AUTHORS_QUERY,
	})

	return (
		<>
			<h1>Awards</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Authors authors={authors} />
			</div>
		</>
	)
}
