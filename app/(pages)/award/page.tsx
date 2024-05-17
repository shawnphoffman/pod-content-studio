import { SanityDocument } from 'next-sanity'

import Awards from '@/components/Awards'
import { sanityFetch } from '@/lib/sanity/sanity.fetch'
import { AWARDS_QUERY } from '@/lib/sanity/sanity.queries'

export default async function Page() {
	const awards = await sanityFetch<SanityDocument[]>({
		query: AWARDS_QUERY,
	})

	return (
		<>
			<h1>Awards</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Awards awards={awards} />
			</div>
		</>
	)
}
