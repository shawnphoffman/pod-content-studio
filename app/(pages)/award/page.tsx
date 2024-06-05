import { Suspense } from 'react'

import Awards from '@/components/Awards'

export default async function Page() {
	return (
		<>
			<h1>Awards</h1>
			{/* <div className="mt-4 italic text-yellow-700 dark:text-yellow-200 ">
				This functionality is currently in development and does not affect production sites.
			</div> */}
			<div className="mt-4 p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Suspense>
					<Awards />
				</Suspense>
			</div>
		</>
	)
}
