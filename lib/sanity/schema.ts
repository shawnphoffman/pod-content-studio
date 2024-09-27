import { type SchemaTypeDefinition } from 'sanity'

import author from './schemaTypes/author'
import award from './schemaTypes/award'
import banner from './schemaTypes/banner'
import blockContent from './schemaTypes/blockContent'
import bonusEpisode from './schemaTypes/bonusEpisode'
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
		banner,
		blockContent,
		award,
		youtube,
		gallery,
		embed,
		bonusEpisode,
		// siteSettings
	],
}
