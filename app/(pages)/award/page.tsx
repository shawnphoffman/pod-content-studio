import { Suspense } from 'react'
import { faBarcodeRead } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import Awards from '@/components/Awards'

export default async function Page() {
	return (
		<>
			<h1>Awards</h1>
			<Link href="/award/extract" className="flex flex-row gap-2 items-center text-sky-400 hover:text-yellow-400">
				<FontAwesomeIcon icon={faBarcodeRead} />
				<span>Extraction Helper</span>
			</Link>
			<div className="mt-4 p-4 border-2 border-zinc-200 border-dashed rounded-lg dark:border-zinc-700">
				<Suspense>
					<Awards />
				</Suspense>
			</div>
		</>
	)
}
