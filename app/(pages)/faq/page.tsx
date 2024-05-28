import Link from 'next/link'

export default async function Page() {
	return (
		<article className="prose dark:prose-invert lg:prose-xl prose-zinc">
			<h1>What is this?</h1>
			<p>
				There are two main goals for this site. One is to allow people to create and edit custom content for their websites, and two is to
				make all of this easy and self-service.
			</p>
			<p>
				Currently, you&apos;re in the preview section of the site. This area is your reassurance, displaying all the content across various
				podcast sites and allowing you to get a basic preview before it goes live. To create or edit content, simply click on the
				<Link href="/studio" className="mx-1 hover:text-sky-500">
					Studio Editor
				</Link>{' '}
				option in the navigation bar, guiding you to where you need to be.
			</p>
			<h2>Warning</h2>
			<p>
				Please do not modify other podcasts&apos; content. I do not have permissions set up yet because they&apos;re a pain, and I&apos;d
				like to avoid them. If this becomes an issue, I can always add them to make things a bit safer. Please try not to do anything dumb.
			</p>
			<h2>Finally</h2>
			<p>If you have questions or see something wrong, you know where to find me.</p>
		</article>
	)
}
