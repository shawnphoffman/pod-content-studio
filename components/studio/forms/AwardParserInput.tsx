import { useCallback, useMemo } from 'react'
import { Box, Button, Flex, Stack, TextInput } from '@sanity/ui'
import { set, unset, useFormValue } from 'sanity'

function extractInfoFromHtml(html: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const imgElement = doc.querySelector('img')
	const linkElement = doc.querySelector('a[href*="leaderboard"]')
	const textElement = doc.querySelector('a[href*="leaderboard"]:nth-of-type(2)')

	const imageUrl = imgElement?.getAttribute('src') || ''
	const imageHeight = imgElement?.getAttribute('height') || imgElement?.style.height.replace('px', '') || ''
	const imageWidth = imgElement?.getAttribute('width') || imgElement?.style.width.replace('px', '') || ''
	const linkUrl = linkElement?.getAttribute('href') || ''
	const awardText = textElement?.textContent?.trim() || ''

	return {
		imageUrl,
		imageHeight,
		imageWidth,
		linkUrl,
		awardText,
	}
}

export function AwardParserInput(props: any) {
	const { value, validation, onChange, readOnly, elementProps } = props
	const errors = useMemo(() => validation.filter(item => item.level === 'error'), [validation])

	const handleChange = useCallback(
		event => {
			const nextValue = event.currentTarget.value
			onChange(nextValue ? set(nextValue) : unset())
		},
		[onChange]
	)

	const rawHtml = String(useFormValue(['rawHtml']))

	const handleParseClick = useCallback(() => {
		const fields = extractInfoFromHtml(rawHtml)

		if (elementProps.id === 'name') {
			onChange(set(fields.awardText))
		} else if (elementProps.id === 'imageUrl') {
			onChange(set(fields.imageUrl))
		} else if (elementProps.id === 'linkUrl') {
			onChange(set(fields.linkUrl))
		} else if (elementProps.id === 'height') {
			onChange(set(Number(fields.imageHeight || 0)))
		} else if (elementProps.id === 'width') {
			onChange(set(Number(fields.imageWidth || 0)))
		}
	}, [elementProps.id, onChange, rawHtml])

	return (
		<Stack space={3}>
			<Flex gap={1}>
				<Box flex={1}>
					<TextInput
						customValidity={errors.length > 0 ? errors[0].message : ''}
						onChange={handleChange}
						value={value?.current || ''}
						readOnly={readOnly}
						{...elementProps}
					/>
				</Box>
				<Button mode="ghost" type="button" onClick={handleParseClick} size={2} text="Parse from Raw" />
			</Flex>
		</Stack>
	)
}
