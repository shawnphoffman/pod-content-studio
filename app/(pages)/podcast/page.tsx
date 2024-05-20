import { Suspense } from 'react'

import Podcasts from '@/components/Podcasts'

export default async function Page() {
	return (
		<>
			<h1>Podcasts</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Suspense>
					<Podcasts />
				</Suspense>
			</div>
		</>
	)
}
