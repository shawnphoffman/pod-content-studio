// import { SanityDocument } from 'next-sanity'

// import Posts from '@/components/Posts'
// import { sanityFetch } from '@/lib/sanity/sanity.fetch'
// import { POSTS_QUERY } from '@/lib/sanity/sanity.queries'

export default async function Page() {
	// const posts = await sanityFetch<SanityDocument[]>({
	// query: POSTS_QUERY,
	// })

	return (
		<>
			<h1>Authors</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700"></div>
		</>
	)
}
