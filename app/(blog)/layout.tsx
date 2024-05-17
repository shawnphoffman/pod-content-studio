import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Pod Content Studio',
	description: 'Where good content is just out of reach',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{draftMode().isEnabled && (
					<div>
						<a className="p-4 bg-blue-300 block" href="/api/disable-draft">
							Disable preview mode
						</a>
					</div>
				)}
				<main>{children}</main>
				{draftMode().isEnabled && <VisualEditing />}
			</body>
		</html>
	)
}
