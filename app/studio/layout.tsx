import './studio.css'

import { Suspense } from 'react'

export const metadata = {
	title: 'Pod Content Studio',
	description: 'Where good content is just out of reach',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Suspense>{children}</Suspense>
			</body>
		</html>
	)
}
