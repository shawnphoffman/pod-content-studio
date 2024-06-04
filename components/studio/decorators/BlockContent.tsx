import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export const QuoteDecorator = ({ children }: Props) => (
	<blockquote className="py-2 px-3 text-lg italic font-semibold leading-tight text-white/90 border-s-8 border-sky-500 bg-zinc-900/75 outline outline-zinc-500/30 rounded-sm">
		{children}
	</blockquote>
)

export const H2Decorator = ({ children }: Props) => <h2 className="text-3xl font-bold leading-snug text-red-600">{children}</h2>
export const H3Decorator = ({ children }: Props) => <h3 className="text-2xl font-bold leading-snug text-yellow-400">{children}</h3>
export const H4Decorator = ({ children }: Props) => <h4 className="text-xl font-bold leading-snug text-sky-400">{children}</h4>

export const ColorRedDecorator = ({ children }: Props) => <span className="text-red-500">{children}</span>
export const ColorBlueDecorator = ({ children }: Props) => <span className="text-blue-500">{children}</span>
export const ColorGreenDecorator = ({ children }: Props) => <span className="text-green-500">{children}</span>
