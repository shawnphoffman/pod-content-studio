import { Suspense } from 'react'

import Awards from '@/components/Awards'

export default async function Page() {
	return (
		<>
			<h1>Awards</h1>
			<div className="p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Suspense>
					<Awards />
				</Suspense>
			</div>
		</>
	)
}
