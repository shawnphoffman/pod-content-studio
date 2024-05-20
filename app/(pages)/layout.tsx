import './pages.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Suspense } from 'react'
// import { draftMode } from 'next/headers'
// import { VisualEditing } from 'next-sanity'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Script from 'next/script'

import Sidebar from '@/components/core/Sidebar'

export const metadata: Metadata = {
	title: `Pod Content Preview`,
	description: 'Where good content is just out of reach',
}

type LayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="text-black dark:text-white bg-white dark:bg-zinc-950">
				<Sidebar />
				<main className="p-4 sm:ml-64">
					<Suspense>{children}</Suspense>
				</main>
				<Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" strategy="beforeInteractive" defer />
			</body>
		</html>
	)
}
