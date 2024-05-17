import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  _updatedAt,
  title,
  date,
	publishedAt,
  excerpt,
  mainImage,
  "slug": slug.current,
  "author": author->{name, image},
	"categories": categories[]->title,
`

export const postsListQuery = groq`
*[_type == "post"] | order(date desc, publishedAt desc) {
  ${postFields}
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
	body,
  ${postFields}
}
`
// =======================
// LIST PAGE QUERIES
// =======================
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`
export const AUTHORS_QUERY = groq`*[_type == "author" && defined(slug)]`
export const AWARDS_QUERY = groq`*[_type == "award"]`

// =======================
// TODO CHANGE THESE
// =======================
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`
