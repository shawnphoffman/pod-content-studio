import { type SchemaTypeDefinition } from 'sanity'

import author from './schemaTypes/author'
import award from './schemaTypes/award'
import blockContent from './schemaTypes/blockContent'
import gallery from './schemaTypes/gallery'
import podcast from './schemaTypes/podcast'
import post from './schemaTypes/post'
import youtube from './schemaTypes/youtube'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [post, author, podcast, blockContent, award, youtube, gallery],
}
