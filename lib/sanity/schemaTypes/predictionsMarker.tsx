import { faCircleQuestion } from '@awesome.me/kit-50792a5d55/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineField, defineType } from 'sanity'

// Placeholder block: insert into a post body to mark where the post's
// `predictions[]` array should be rendered. No editable data of its own;
// the structured predictions live on the parent document.
//
// If a post has predictions but no marker, the site renderer falls back to
// appending the grid after the body.
const predictionsMarker = defineType({
	name: 'predictionsMarker',
	title: 'Predictions Grid',
	type: 'object',
	icon: () => <FontAwesomeIcon icon={faCircleQuestion} size="xs" />,
	fields: [
		defineField({
			name: 'label',
			title: 'Label (for editors)',
			description: 'Optional note shown only in the studio; not rendered on the site.',
			type: 'string',
		}),
	],
	preview: {
		select: { label: 'label' },
		prepare(selection) {
			return { title: 'Predictions Grid', subtitle: selection.label || 'Renders the post\'s predictions here' }
		},
	},
})

export default predictionsMarker
