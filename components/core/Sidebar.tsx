import { faShawn } from '@awesome.me/kit-50792a5d55/icons/kit/custom'
import { faAward, faBars, faBlockQuestion, faNewspaper, faPenNib, faPodcast, faUser } from '@awesome.me/kit-50792a5d55/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Sidebar() {
	return (
		<>
			{/* Hamburger */}
			<button
				data-drawer-target="logo-sidebar"
				data-drawer-toggle="logo-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-zinc-500 rounded-lg sm:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
			>
				<div className="text-2xl">
					<FontAwesomeIcon icon={faBars} fixedWidth />
				</div>
			</button>
			{/* Sidebar */}
			<aside
				id="logo-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-hidden="true"
			>
				<div className="h-full px-3 py-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-800">
					{/* Title */}
					<a href="/" className="flex items-center ps-2.5 mb-5 gap-2 dark:text-blue-300">
						<FontAwesomeIcon icon={faShawn} className="text-4xl" />
						<span className="self-center text-xl font-semibold whitespace-nowrap ">Pod Content</span>
					</a>
					{/* STATIC PAGES */}
					<ul className="space-y-2 font-medium">
						<li>
							<Link href="/faq" className="sidebar-item group">
								<FontAwesomeIcon icon={faBlockQuestion} fixedWidth />
								<span>WTF is this?</span>
							</Link>
						</li>
					</ul>
					{/* STUDIO */}
					<ul className="space-y-2 font-semibold text-lg pt-2 mt-2 border-t border-zinc-210 dark:border-zinc-700">
						<li>
							{/* <Link href="/studio" className="sidebar-item group !text-sky-600 dark:!text-sky-400"> */}
							<Link href="/studio" className="sidebar-item group animate-pulse">
								<FontAwesomeIcon icon={faPenNib} fixedWidth />
								<span>Studio Editor</span>
							</Link>
						</li>
					</ul>
					{/* LINKS */}
					<ul className="space-y-2 font-medium pt-2 mt-2 border-t border-zinc-210 dark:border-zinc-700">
						<li>
							<Link href="/" className="sidebar-item group">
								<FontAwesomeIcon icon={faNewspaper} fixedWidth />
								<span>Posts</span>
							</Link>
						</li>
						<li>
							<Link href="/podcast" className="sidebar-item group">
								<FontAwesomeIcon icon={faPodcast} fixedWidth />
								<span>Podcasts</span>
							</Link>
						</li>
						<li>
							<Link href="/author" className="sidebar-item group">
								<FontAwesomeIcon icon={faUser} fixedWidth />
								<span>Authors</span>
							</Link>
						</li>
						<li>
							<Link href="/award" className="sidebar-item group">
								<FontAwesomeIcon icon={faAward} fixedWidth />
								<span>Awards</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>
		</>
	)
}
