import { LeaveIcon } from '@sanity/icons'
import { Button } from '@sanity/ui'

export default function ToolMenu(props) {
	return (
		<>
			<>{props.renderDefault(props)}</>
			<Button as="a" href="/" padding={2} icon={LeaveIcon} mode="bleed" text="Leave Studio" />
		</>
	)
}
