import { Suspense } from 'react'

import Posts from '@/components/Posts'

export default async function Page() {
	return (
		<>
			<h1>Posts</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Suspense>
					<Posts />
				</Suspense>
			</div>
		</>
	)
}
