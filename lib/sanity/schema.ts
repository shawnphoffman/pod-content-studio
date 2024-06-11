import { type SchemaTypeDefinition } from 'sanity'

import author from './schemaTypes/author'
import award from './schemaTypes/award'
import blockContent from './schemaTypes/blockContent'
import embed from './schemaTypes/embed'
import gallery from './schemaTypes/gallery'
import podcast from './schemaTypes/podcast'
import post from './schemaTypes/post'
// import siteSettings from './schemaTypes/siteSettings'
import youtube from './schemaTypes/youtube'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		post,
		author,
		podcast,
		blockContent,
		award,
		youtube,
		gallery,
		embed,
		// siteSettings
	],
}
