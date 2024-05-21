import { groq } from 'next-sanity'

// TODO - CACHE THESE QUERIES!!!

const postFields = `
  _id,
  _updatedAt,
  title,
  date,
	publishedAt,
  excerpt,
  mainImage,
  "slug": slug.current,
  "author": author->{name, image},
	"categories": categories[]->{title, image},
`

// =======================
// POST QUERIES
// =======================
export const POSTS_QUERY = groq`*[_type == "post"] | order(date desc, publishedAt desc) {
	${postFields}
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
	body,
	${postFields}
}`

// =======================
// PODCAST QUERIES
// =======================
// const podcastFields = ``
export const PODCASTS_QUERY = groq`*[_type == "category"]`

export const PODCAST_QUERY = groq`*[_type == "category" && _id == $id][0]`

// =======================
// AUTHOR QUERIES
// =======================
// const authorFields = ``
export const AUTHORS_QUERY = groq`*[_type == "author"]`

export const AUTHOR_QUERY = groq`*[_type == "author" && slug.current == $slug][0]`

// =======================
// AWARD QUERIES
// =======================
const awardFields = `
	_id,
	name,
	imageUrl,
	linkUrl,
	"category": category->{title, image}
`
export const AWARDS_QUERY = groq`*[_type == "award"]{
	${awardFields}
}`

export const AWARD_QUERY = groq`*[_type == "award" && _id == $id][0] {
	${awardFields}
}`
