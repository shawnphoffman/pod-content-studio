export const QuoteDecorator = props => (
	<blockquote className="p-4 text-xl italic font-medium leading-relaxed text-white border-s-4 border-sky-500 bg-zinc-900/75">
		{props.children}
	</blockquote>
)
export const H2Decorator = props => <h2 className="text-3xl font-bold leading-snug text-red-600">{props.children}</h2>
export const H3Decorator = props => <h3 className="text-2xl font-bold leading-snug text-yellow-400">{props.children}</h3>
export const H4Decorator = props => <h4 className="text-xl font-bold leading-snug text-sky-400">{props.children}</h4>
