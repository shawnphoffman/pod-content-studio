import { useCallback } from 'react'
import { Stack, Text, TextArea } from '@sanity/ui'
import { set, unset } from 'sanity'

export const ImprovedInput = props => {
	const { elementProps, onChange, value = '', validation } = props

	const handleChange = useCallback(
		event => {
			const nextValue = event.currentTarget.value
			onChange(nextValue ? set(nextValue) : unset())
		},
		[onChange]
	)

	return (
		<Stack space={2}>
			<TextArea {...elementProps} onChange={handleChange} value={value} customValidity={validation[0]?.message || ''} />
			<Text size={0} muted>
				Characters: {value.length}
			</Text>
		</Stack>
	)
}
