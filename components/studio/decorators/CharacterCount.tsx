import { Stack, Text } from '@sanity/ui'

export default function CustomStringInput(props) {
	console.log('CustomStringInput', props)
	return (
		<Stack space={2}>
			{props.renderDefault(props)}
			<Text size={0} style={{ color: 'orange' }}>
				Characters: {props.value?.length || 0}
			</Text>
		</Stack>
	)
}
