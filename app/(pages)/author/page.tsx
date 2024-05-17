import { Suspense } from 'react'

import Authors from '@/components/Authors'

export default async function Page() {
	return (
		<>
			<h1>Authors</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Suspense>
					<Authors />
				</Suspense>
			</div>
		</>
	)
}
