export const QuoteDecorator = props => (
	<blockquote className="py-2 px-3 text-lg italic font-semibold leading-tight text-white/90 border-s-8 border-sky-500 bg-zinc-900/75 outline outline-zinc-500/30 rounded-sm">
		{props.children}
	</blockquote>
)
export const H2Decorator = props => <h2 className="text-3xl font-bold leading-snug text-red-600">{props.children}</h2>
export const H3Decorator = props => <h3 className="text-2xl font-bold leading-snug text-yellow-400">{props.children}</h3>
export const H4Decorator = props => <h4 className="text-xl font-bold leading-snug text-sky-400">{props.children}</h4>
