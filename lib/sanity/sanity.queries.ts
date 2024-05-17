import { groq } from 'next-sanity'

// TODO - CACHE THESE QUERIES!!!

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

// =======================
// LIST PAGE QUERIES
// =======================
export const POSTS_QUERY = groq`*[_type == "post"] | order(date desc, publishedAt desc) {
  ${postFields}
}`
export const AUTHORS_QUERY = groq`*[_type == "author"]`
export const AWARDS_QUERY = groq`*[_type == "award"]`

// =======================
// ITEM PAGE QUERIES
// =======================
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
	body,
  ${postFields}
}`
