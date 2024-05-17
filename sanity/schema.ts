import { type SchemaTypeDefinition } from 'sanity'

import author from './schemaTypes/author'
import award from './schemaTypes/award'
import blockContent from './schemaTypes/blockContent'
import category from './schemaTypes/category'
import post from './schemaTypes/post'
import youtube from './schemaTypes/youtube'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [post, author, category, blockContent, award, youtube],
}
