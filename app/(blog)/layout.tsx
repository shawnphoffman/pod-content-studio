import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

// import { draftMode } from 'next/headers'
// import { VisualEditing } from 'next-sanity'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Script from 'next/script'

import Sidebar from '@/components/core/Sidebar'

export const metadata: Metadata = {
	title: 'Pod Content Studio',
	description: 'Where good content is just out of reach',
}

type LayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="text-black dark:text-white bg-white dark:bg-zinc-950">
				{/* {draftMode().isEnabled && (
					<div>
						<a className="p-4 bg-blue-300 block" href="/api/disable-draft">
							Disable preview mode
						</a>
					</div>
				)} */}
				<Sidebar />
				<main className="p-4 sm:ml-64">{children}</main>
				{/* {draftMode().isEnabled && <VisualEditing />} */}
				<Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" strategy="beforeInteractive" defer />
			</body>
		</html>
	)
}
